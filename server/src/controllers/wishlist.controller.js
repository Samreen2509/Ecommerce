import Product from '../models/product.model.js';
import Wishlist from '../models/wishlist.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getWishlist = async (userId) => {
  const wishlistAggregation = await Wishlist.aggregate([
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
        localField: 'items.productId',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $project: {
        product: { $first: '$product' },
      },
    },
    {
      $group: {
        _id: '$_id',
        items: {
          $push: '$$ROOT',
        },
      },
    },
  ]);

  return (
    wishlistAggregation[0] ?? {
      _id: null,
      items: [],
    }
  );
};

// export const createWishlist = asyncHandler(async (req, res) => {
//   const wishlist = await Wishlist.create({
//     owner: req.user._id,
//   });

//   return res
//     .status(200)
//     .json(new ApiResponse(200, wishlist, 'wishlist created successfully'));
// });

export const getUserWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getWishlist(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, wishlist, 'wishlist fetched successfully'));
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.query;

  if (!productId) {
    throw new ApiError(400, 'Product ID is required');
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(
      400,
      `Product does not exist with the id - ${productId}`
    );
  }

  const wishlist = await Wishlist.findOne({
    owner: req.user._id,
  });

  const itemAlreadyAdded = wishlist.items.find((item) => {
    item.productId.toString() === productId;
  });

  if (itemAlreadyAdded) {
    throw new ApiError(400, 'Item already exists in the wishlist');
  }

  wishlist.items.push({
    productId,
  });

  await wishlist.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, wishlist, 'Item added to the wishlist successfully')
    );
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.query;

  if (!productId) {
    throw new ApiError(400, 'Product ID is required');
  }

  const updatedWishlist = await Wishlist.findOneAndUpdate(
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

  if (!updatedWishlist) {
    throw new ApiError(500, 'Error occured while removing item from wishlist');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedWishlist, 'Item removed from the wishlist')
    );
});

export const clearWishlist = asyncHandler(async (req, res) => {
  await Wishlist.findOneAndUpdate(
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

  const wishlist = await getWishlist(req.user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, wishlist, 'All items are removed from wishlist')
    );
});
