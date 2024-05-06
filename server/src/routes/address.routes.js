import { Router } from 'express';
import {
  createAdress,
  getAllUserAddress,
  getOneUserAddress,
  removeAddress,
  updateAddress,
} from '../controllers/address.controller.js';

const router = Router();

router.route('/:ownerId').post(createAdress);
router.route('/').get(getAllUserAddress);

router
  .route('/:addressId')
  .get(getOneUserAddress)
  .put(updateAddress)
  .delete(removeAddress);

export default router;
