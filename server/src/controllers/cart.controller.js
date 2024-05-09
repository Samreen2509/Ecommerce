import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Function to aggregate items in a cart
const getCart = async (userId) => {
  const cartAggregation = await Cart.aggregate([
    {
      $match: {
        owner: userId,
      },
    },
    {
      $unwind: '$items',
    },
    {
      $lookup: {
        from: 'products',
        localFields: 'items.productId',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $project: {
        product: { $first: '$product' },
        quantity: '$items.quantity',
      },
    },
    {
      $group: {
        _id: '$_id',
        items: {
          $push: '$$ROOT',
        },
        cartTotal: {
          $sum: {
            $multiply: ['$product.price', '$quantity'],
          },
        },
      },
    },
  ]);

  return (
    cartAggregation[0] ?? {
      _id: null,
      items: [],
      cartTotal: 0,
    }
  );
};

// Controller to fetch user cart.
export const fetchUserCart = asyncHandler(async (req, res) => {
  const cart = await getCart(req.user._id);

  return res.status(200).json(new ApiResponse(200, cart));
});

// Controller to add or update item in a cart
export const addOrUpdateCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const cart = await Cart.findOne({
    owner: req.user._id,
  });

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, 'Product does not exist');
  }
  if (quantity > product.stock) {
    throw new ApiError(
      400,
      product.stock > 0
        ? `Only ${product.stock} items are remaining`
        : 'Product is out of stock'
    );
  }

  const addedProduct = cart.items?.find(
    (item) => item.productId.toString() === productId
  );

  if (addedProduct) {
    // if a product already exist in the cart we're updating it's quantity
    addedProduct.quantity = quantity;
  } else {
    // otherwise we're adding new product
    cart.items.push({
      productId,
      quantity,
    });
  }

  await cart.save();

  const newCart = await getCart(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, newCart, 'Item added to the cart successfully'));
});

// Controller to remove item from the cart
export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(400, 'Product does not exist');
  }

  const updatedCart = await Cart.findOneAndUpdate(
    {
      owner: req.user._id,
    },
    {
      $pull: {
        items: {
          productId: productId,
        },
      },
    },
    { new: true }
  );

  if (!updatedCart) {
    throw new ApiError(
      500,
      'Some error occured while removing the item from the cart'
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedCart,
        'Item removed from the cart successfully'
      )
    );
});

export const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndUpdate(
    {
      owner: req.user._id,
    },
    {
      $set: {
        items: [],
      },
    },
    { new: true }
  );

  const cart = await getCart(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, 'All items are removed from cart'));
});
