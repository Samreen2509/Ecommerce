import { Router } from 'express';
import {
  createCategory,
  getAllCategory,
  getOneCategory,
  removeCategory,
  updateCategory,
} from '../controllers/category.controller.js';

const router = Router();

router.route('/').post(createCategory).get(getAllCategory);

router
  .route('/:categoryId')
  .get(getOneCategory)
  .put(updateCategory)
  .delete(removeCategory);

export default router;
