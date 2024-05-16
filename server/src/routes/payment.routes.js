import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { stripeWebhook } from '../controllers/payment.controllers.js';

const paymentRoutes = Router();
const webhookRoutes = Router();

paymentRoutes.route('/').get(verifyJWT);

webhookRoutes.route('/').post(stripeWebhook);

export { paymentRoutes, webhookRoutes };
