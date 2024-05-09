import { Router } from 'express';
import {
  addOrUpdateCart,
  clearCart,
  fetchUserCart,
  removeFromCart,
} from '../controllers/cart.controller.js';

const router = Router();

router.route('/').get(fetchUserCart);

router.route('/addorupdatetocart').put(addOrUpdateCart);

router.route('/removeitemfromcart').patch(removeFromCart);

router.route('/clearcart').patch(clearCart);

export default router;
