import { Router } from 'express';
import {
  createAdress,
  getAllUserAddress,
  getOneUserAddress,
  removeAddress,
  updateAddress,
} from '../controllers/address.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/:ownerId').post(verifyJWT, createAdress);
router.route('/').get(verifyJWT, getAllUserAddress);

router
  .route('/:addressId')
  .get(verifyJWT, getOneUserAddress)
  .put(verifyJWT, updateAddress)
  .delete(verifyJWT, removeAddress);

export default router;
