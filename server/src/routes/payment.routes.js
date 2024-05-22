import { Router } from 'express';
import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { stripeWebhook } from '../controllers/payment.controllers.js';
import { getPayment, addPayment } from '../controllers/payment.controllers.js';

const paymentRoutes = Router();
const stripeWebhookRoutes = Router();

stripeWebhookRoutes
  .route('/checkout/webhook')
  .post(express.raw({ type: 'application/json' }), stripeWebhook);

paymentRoutes.route('/').get(verifyJWT, getPayment);
paymentRoutes
  .route('/:userId/:paymentId')
  .get(verifyJWT, getPayment)
  .post(verifyJWT, addPayment);

export { paymentRoutes, stripeWebhookRoutes };
