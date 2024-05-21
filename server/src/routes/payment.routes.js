import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { stripeWebhook } from '../controllers/payment.controllers.js';
import { getPayment, addPayment } from '../controllers/payment.controllers.js';

const router = Router();

router.route('/').get(verifyJWT, getPayment);
router
  .route('/:userId/:paymentId')
  .get(verifyJWT, getPayment)
  .post(verifyJWT, addPayment);

router.route('/checkout/webhook').post(stripeWebhook);

export default router;
