import { availablePaymentStatus, availableUserRoles } from '../constants.js';
import Payment from '../models/payment.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { makeStripe } from '../utils/Stripe.js';
import Stripe from 'stripe';
import { getItemsPipeline } from '../utils/pipelines/orderItemInfo.js';
import { getPaymentInfoPipeline } from '../utils/pipelines/PaymentInfo.js';
import { ObjectId } from 'mongodb';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';

export const stripeWebhook = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET_KET;
  const sig = req.headers['stripe-signature'];

  let event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

  const checkoutSessionId = await event.data.object.id;
  const updatePayment = async (status) => {
    const paymentInfo = await Payment.findOne({
      stripeId: checkoutSessionId,
    });

    if (!paymentInfo) {
      throw new ApiError(500, 'something went worng');
    }

    await Payment.findByIdAndUpdate(paymentInfo._id, {
      $set: {
        status: status,
      },
    });
  };

  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      await updatePayment(availablePaymentStatus.FAILED);
      break;
    case 'checkout.session.completed':
      await updatePayment(availablePaymentStatus.COMPLETED);
      break;
    case 'checkout.session.expired':
      await updatePayment(availablePaymentStatus.FAILED);
      break;
    default:
      console.log(`something went worng ${event.type}`);
  }
  res.send();
});

export const getPayment = asyncHandler(async (req, res) => {
  const user = req.user;
  const { userId, paymentId } = req.params;

  if (!paymentId && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  if (!userId && !paymentId && user.role == availableUserRoles.ADMIN) {
    const paymentPipeline = [...getPaymentInfoPipeline];
    const paymentInfo = await Payment.aggregate(paymentPipeline);
    if (!paymentInfo) {
      throw new ApiError(404, 'data not found');
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { paymentInfo: paymentInfo },
          'all payment data retrieved'
        )
      );
  }

  if (userId != user._id && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const paymentPipeline = [...getPaymentInfoPipeline];
  paymentPipeline.unshift({
    $match: {
      _id: new ObjectId(paymentId),
      user: new ObjectId(userId),
    },
  });
  const paymentInfo = await Payment.aggregate(paymentPipeline);

  if (!paymentInfo) {
    throw new ApiError(404, 'data not found');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { paymentInfo: paymentInfo },
        'payment data retrieved'
      )
    );
});

export const addPayment = asyncHandler(async (req, res) => {
  const user = req.user;
  const { userId, paymentId } = req.params;

  if (!userId || !paymentId) {
    throw new ApiError(404, 'params not found');
  }

  if (user._id != userId && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const oldPayment = await Payment.findById(paymentId);
  if (!oldPayment) {
    throw new ApiError(404, 'payment not found');
  }

  if (
    !(
      oldPayment.status == availablePaymentStatus.FAILED ||
      oldPayment.status == availablePaymentStatus.CANCELLED ||
      oldPayment.status == availablePaymentStatus.DISPUTED
    )
  ) {
    throw new ApiError(500, 'payment already done or panding');
  }

  const orderInfo = await Order.findById(oldPayment.orderId);
  if (!orderInfo) {
    throw new ApiError(404, 'payment order not found');
  }

  const items = orderInfo.items;
  const itemsPipeline = await getItemsPipeline(items);
  const itemProductData = await Product.aggregate(itemsPipeline);

  if (!itemProductData) {
    throw new ApiError(404, 'product data not found');
  }

  const paymentSession = await makeStripe(itemProductData);
  if (!paymentSession) {
    throw new ApiError(500, 'unable to generate the payment URL');
  }

  const newPaymentData = {
    price: paymentSession.amount_total / 100,
    stripeId: paymentSession.id,
    user: userId,
    orderId: oldPayment.orderId,
    url: paymentSession.url,
  };

  const newPayment = await Payment.create(newPaymentData);
  if (!newPayment) {
    throw new ApiError(500, 'something went worng');
  }

  await Order.findByIdAndUpdate(orderInfo._id, {
    $set: {
      paymentId: newPayment._id,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { paymentInfo: newPayment }, 'new payment created')
    );
});
