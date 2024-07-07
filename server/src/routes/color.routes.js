import { Router } from 'express';
import {
  createColor,
  listColors,
  updateColor,
  getOneColor,
  deleteColor,
} from '../controllers/color.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').get(listColors).post(verifyJWT, createColor);
router
  .route('/:colorId')
  .get(getOneColor)
  .put(verifyJWT, updateColor)
  .delete(verifyJWT, deleteColor);

export default router;
