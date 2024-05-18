import express, { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  addToWishlist,
  clearWishlist,
  //   createWishlist,
  getUserWishlist,
  removeFromWishlist,
} from '../controllers/wishlist.controller.js';

const router = Router();

router.use(verifyJWT);

// router.route('/').post(createWishlist);

router.route('/getuserwishlist').get(getUserWishlist);

router.route('/addtowishlist').put(addToWishlist);

router.route('/removefromwishlist').put(removeFromWishlist);

router.route('/clearwishlist').put(clearWishlist);

export default router;
