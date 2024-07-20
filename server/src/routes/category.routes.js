import { Router } from 'express';
import {
  createCategory,
  getAllCategory,
  getOneCategory,
  removeCategory,
  updateCategory,
} from '../controllers/category.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router
  .route('/')
  .post(verifyJWT, upload.single('image'), createCategory)
  .get(getAllCategory);

router
  .route('/:categoryId')
  .get(getOneCategory)
  .put(verifyJWT, upload.single('image'), updateCategory)
  .delete(verifyJWT, removeCategory);

export default router;
