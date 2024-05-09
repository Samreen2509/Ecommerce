import { Router } from 'express';
import {
  createCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from '../controllers/category.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router
  .route('/')
  .post(upload.single('image'), createCategory)
  .get(getAllCategory);

router.route('/:categoryId').get(getOneCategory).put(updateCategory);
// .delete(removeCategory);

export default router;
