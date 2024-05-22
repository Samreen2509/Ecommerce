import {
  availableUserRoles,
  orderStatus,
  availablePaymentMethod,
} from '../constants.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ObjectId } from 'mongodb';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import Payment from '../models/payment.model.js';
import { getOrderInfoPipeline } from '../utils/pipelines/orderInfo.js';
import { getItemsPipeline } from '../utils/pipelines/orderItemInfo.js';
import { makeStripe } from '../utils/Stripe.js';

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
      .json({ error: 'items must be provided in an array' });
  }

  for (const item of items) {
    if (!item.productId) {
      throw new ApiError(400, 'each item must have a valid productId');
    }
  }

  const itemsPipeline = await getItemsPipeline(items);
  const itemProductData = await Product.aggregate(itemsPipeline);

  if (!itemProductData) {
    throw new ApiError(500, 'something went worng');
  }

  const orderData = {
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
    paymentSession = await makeStripe(itemProductData);

    const paymentData = {
      price: paymentSession.amount_total / 100,
      stripeId: paymentSession.id,
      user: user.id,
      orderId: newOrder._id,
    };

    const newPayment = await Payment.create(paymentData);
    if (!newPayment) {
      throw new ApiError(500, 'unable to generate the payment URL');
    }

    const updateOrder = await Order.findByIdAndUpdate(newOrder._id, {
      $set: {
        paymentId: newPayment._id,
        orderPrice: paymentSession.amount_total / 100,
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
