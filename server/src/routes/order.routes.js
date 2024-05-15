import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  addOrder,
  deleteOrder,
  getOrder,
  updateOrder,
} from '../controllers/order.controllers.js';

const router = Router();

router.route('/').get(verifyJWT, getOrder);
router
  .route('/:userId')
  .get(verifyJWT, getOrder)
  .post(verifyJWT, addOrder)
  .delete(verifyJWT, deleteOrder);

router
  .route('/:userId/:orderId')
  .get(verifyJWT, getOrder)
  .put(verifyJWT, updateOrder)
  .delete(verifyJWT, deleteOrder);

export default router;
