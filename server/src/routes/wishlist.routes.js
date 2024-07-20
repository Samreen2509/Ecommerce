import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  addToWishlist,
  clearWishlist,
  getUserWishlist,
  getUserWishlistProduct,
  removeFromWishlist,
} from '../controllers/wishlist.controller.js';

const router = Router();

router.route('/getWishProduct').get(verifyJWT, getUserWishlistProduct);

router
  .route('/')
  .get(verifyJWT, getUserWishlist)
  .delete(verifyJWT, clearWishlist);

router
  .route('/:productId')
  .post(verifyJWT, addToWishlist)
  .delete(verifyJWT, removeFromWishlist);

export default router;
