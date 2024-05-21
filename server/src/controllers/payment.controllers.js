import { availablePaymentStatus, availableUserRoles } from '../constants.js';
import Payment from '../models/payment.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { makeStripe } from '../utils/Stripe.js';
import Stripe from 'stripe';
import { getItemsPipeline } from '../utils/pipelines/orderItemInfo.js';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';

export const stripeWebhook = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET_KET;
  const sig = req.headers['stripe-signature'];

  let event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  res.status(400).send(`Webhook Error: ${err.message}`);

  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      console.log('failed', event);
      break;
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      console.log('succeed', event);
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      console.log('completed', event);
      break;
    case 'checkout.session.expired':
      const checkoutSessionExpired = event.data.object;
      console.log('expired', event);
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
    const paymentInfo = await Payment.find();
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

  const paymentInfo = await Payment.findOne({ _id: paymentId, user: userId });

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
  };

  const newPayment = await Payment.create(newPaymentData);
  if (!newPayment) {
    throw new ApiError(500, 'something went worng');
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        paymentInfo: {
          ...newPayment.toObject(),
          url: paymentSession.url,
        },
      },
      'new payment created'
    )
  );
});
