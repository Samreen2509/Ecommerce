import {
  availableUserRoles,
  orderStatus,
  availablePaymentMethod,
} from '../constants.js';
import Order from '../models/order.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ObjectId } from 'mongodb';
import Product from '../models/product.model.js';
import Stripe from 'stripe';
import Payment from '../models/payment.model.js';

const getOrderInfoPipeline = [
  {
    $lookup: {
      from: 'users',
      localField: 'customer',
      foreignField: '_id',
      as: 'customer',
    },
  },
  {
    $lookup: {
      from: 'addresses',
      localField: 'address',
      foreignField: '_id',
      as: 'address',
    },
  },
  {
    $lookup: {
      from: 'payments',
      localField: 'paymentId',
      foreignField: '_id',
      as: 'payment',
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
      as: 'items.product',
    },
  },
  {
    $unwind: '$items.product',
  },
  {
    $lookup: {
      from: 'categories',
      localField: 'items.product.category',
      foreignField: '_id',
      as: 'items.product.category',
    },
  },
  {
    $group: {
      _id: '$_id',
      orderPrice: {
        $first: '$orderPrice',
      },
      customer: {
        $first: '$customer',
      },
      address: {
        $first: '$address',
      },
      status: {
        $first: '$status',
      },
      payment: {
        $first: '$payment',
      },
      isPaymentDone: {
        $first: '$isPaymentDone',
      },
      items: {
        $push: '$items',
      },
    },
  },
  {
    $addFields: {
      customer: {
        $mergeObjects: [
          {
            _id: {
              $arrayElemAt: ['$customer._id', 0],
            },
            name: {
              $arrayElemAt: ['$customer.name', 0],
            },
            username: {
              $arrayElemAt: ['$customer.username', 0],
            },
            email: {
              $arrayElemAt: ['$customer.email', 0],
            },
          },
        ],
      },
      address: {
        $mergeObjects: ['$address'],
      },
      payment: {
        $mergeObjects: [
          {
            _id: {
              $arrayElemAt: ['$payment._id', 0],
            },
            price: {
              $arrayElemAt: ['$payment.price', 0],
            },
            stripeId: {
              $arrayElemAt: ['$payment.stripeId', 0],
            },
            status: {
              $arrayElemAt: ['$payment.status', 0],
            },
          },
        ],
      },
    },
  },
  {
    $project: {
      _id: 1,
      orderPrice: 1,
      customer: 1,
      address: 1,
      status: 1,
      payment: 1,
      items: {
        $map: {
          input: '$items',
          as: 'item',
          in: {
            $mergeObjects: [
              {
                quantity: '$$item.quantity',
                size: '$$item.size',
              },
              {
                product: {
                  $mergeObjects: [
                    '$$item.product',
                    {
                      category: {
                        $arrayElemAt: ['$$item.product.category', 0],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
  },
];

const makeStripe = async (items) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const lineItemArray = [];
  await items.map((item) => {
    const lineItem = {
      price_data: {
        currency: 'inr',
        product_data: {
          name: `${item.name}`,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
    lineItemArray.push(lineItem);
  });

  const sessionData = {
    payment_method_types: ['card'],
    line_items: lineItemArray,
    mode: 'payment',
    success_url: 'http://localhost:1234/success',
    cancel_url: 'http://localhost:1234/cancel',
  };

  const session = await stripe.checkout.sessions.create(sessionData);
  if (!session) {
    throw new ApiError(500, 'something went worng');
  }
  return session;
};

export const getOrder = asyncHandler(async (req, res) => {
  const user = await req.user;
  const { userId, orderId } = await req.params;

  if (!userId && !orderId && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  if (userId && user._id != userId && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const orderPipeline = [...getOrderInfoPipeline];
  if (userId && !orderId) {
    orderPipeline.unshift({
      $match: {
        customer: new ObjectId(userId),
      },
    });
  }

  if (userId && orderId) {
    orderPipeline.unshift({
      $match: {
        _id: new ObjectId(orderId),
        customer: new ObjectId(userId),
      },
    });
  }

  const data = await Order.aggregate(getOrderInfoPipeline);
  if (!data) {
    throw new ApiError(500, `failed to retrieve order data - ${data}`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { orderInfo: data }, 'order data retrieved'));
});

export const addOrder = asyncHandler(async (req, res) => {
  const user = req.user;
  const { userId } = req.params;
  const { items, addressId, paymentMethod } = req.body;
  let { orderPrice } = req.body;

  if (!userId) {
    throw new ApiError(404, 'please provide user id in params');
  }

  if (userId != user._id && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  if (!items || !addressId || !paymentMethod) {
    throw new ApiError(404, 'please provide required fields');
  }

  if (!Array.isArray(items)) {
    return res
      .status(400)
      .json({ error: 'Items must be provided in an array' });
  }

  for (const item of items) {
    if (!item.productId) {
      throw new ApiError(400, 'each item must have a valid productId');
    }
  }

  const productIds = items.map((item) => item.productId);
  const getPricePipeline = [
    {
      $match: {
        _id: { $in: productIds.map((id) => new ObjectId(id)) },
      },
    },
    {
      $addFields: {
        products: {
          $map: {
            input: productIds,
            as: 'productId',
            in: {
              _id: '$$productId',
              name: '$name',
              description: '$description',
              price: '$price',
              quantity: {
                $arrayElemAt: [
                  {
                    $map: {
                      input: {
                        $filter: {
                          input: items,
                          as: 'item',
                          cond: { $eq: ['$$item.productId', '$$productId'] },
                        },
                      },
                      as: 'item',
                      in: '$$item.quantity',
                    },
                  },
                  0,
                ],
              },
            },
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: '$price' },
        products: { $push: '$products' },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
        products: { $arrayElemAt: ['$products', 0] },
      },
    },
  ];

  const itemProductData = await Product.aggregate(getPricePipeline);

  if (!itemProductData) {
    throw new ApiError(500, 'something went worng');
  }

  if (!orderPrice) {
    orderPrice = itemProductData[0].totalPrice;
  }

  const orderData = {
    orderPrice: orderPrice,
    items: items,
    customer: userId,
    address: addressId,
    status: orderStatus.PENDING,
  };

  const newOrder = await Order.create(orderData);
  if (!newOrder) {
    throw new ApiError(500, 'order not created');
  }

  let paymentSession;
  if (paymentMethod == availablePaymentMethod.ONLINE) {
    paymentSession = await makeStripe(itemProductData[0].products);

    const paymentData = {
      price: paymentSession.amount_total / 100,
      stripeId: paymentSession.id,
      user: user.id,
    };

    const newPayment = await Payment.create(paymentData);
    if (!newPayment) {
      throw new ApiError(500, 'unable to generate the payment URL');
    }

    const updateOrder = await Order.findByIdAndUpdate(newOrder._id, {
      $set: {
        paymentId: newPayment._id,
      },
    });

    if (!updateOrder) {
      throw new ApiError(500, 'unable to set payment id');
    }
  }

  const orderPipeline = [...getOrderInfoPipeline];
  orderPipeline.unshift({
    $match: {
      _id: new ObjectId(newOrder._id),
    },
  });
  const orderInfo = await Order.aggregate(orderPipeline);
  if (!orderInfo) {
    throw new ApiError(500, 'something went worng');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { orderInfo: orderInfo[0], paymentInfo: { url: paymentSession.url } },
        'order created successfully'
      )
    );
});

export const updateOrder = asyncHandler(async (req, res) => {
  const user = await req.user;
  const { userId, orderId } = await req.params;
  const { status, paymentStatus } = await req.body;

  if (!userId || !orderId) {
    throw new ApiError(404, 'please provide params');
  }

  if (!status && !paymentStatus) {
    throw new ApiError(404, 'please provide update data');
  }

  if (user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const updateData = {};
  if (status) {
    updateData.status = status;
  }

  if (paymentStatus) {
    updateData.isPaymentDone = paymentStatus;
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { $set: updateData },
    { new: true }
  );

  const orderPipeline = [...getOrderInfoPipeline];
  orderPipeline.unshift({
    $match: {
      _id: new ObjectId(updatedOrder._id),
    },
  });

  const orderInfo = await Order.aggregate(orderPipeline);
  if (!orderInfo) {
    throw new ApiError(500, 'something went worng');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { orderInfo: orderInfo[0] },
        'order data updated successfully'
      )
    );
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const user = await req.user;
  const { userId, orderId } = await req.params;

  if (user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  if (!userId || !orderId) {
    throw new ApiError(404, 'please provide param');
  }

  if (orderId) {
    const deleteOrder = await Order.findByIdAndDelete(orderId);
    if (!deleteOrder) {
      throw new ApiError(500, 'failed to delete order');
    }
  }

  if (!orderId && userId) {
    const deleteOrder = await Order.deleteMany({ customer: userId });
    if (!deleteOrder) {
      throw new ApiError(500, 'failed to delete order');
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'order deleted successfully'));
});
