import { Router } from 'express';
import {
  addOrUpdateCart,
  clearCart,
  fetchUserCart,
  removeFromCart,
} from '../controllers/cart.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.route('/').get(fetchUserCart);

router.route('/addorupdatetocart').put(addOrUpdateCart);

router.route('/removeitemfromcart/:productId').patch(removeFromCart);

router.route('/clearcart').patch(clearCart);

export default router;
