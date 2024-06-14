import { Router } from 'express';
import {
  createAdress,
  getAllAddress,
  getOneAddress,
  removeAddress,
  updateAddress,
  getUserAdderss,
} from '../controllers/address.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').get(verifyJWT, getAllAddress);

router
  .route('/:userId')
  .get(verifyJWT, getUserAdderss)
  .post(verifyJWT, createAdress);

router
  .route('/:userId/:addressId')
  .get(verifyJWT, getOneAddress)
  .put(verifyJWT, updateAddress)
  .delete(verifyJWT, removeAddress);

export default router;
