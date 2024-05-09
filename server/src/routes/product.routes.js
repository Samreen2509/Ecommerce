import { Router } from 'express';
import {
  createProduct,
  updateProduct,
  removeProduct,
  uploadOtherImages,
  getProduct,
  getOneProduct,
} from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();
const router = Router();

router
  .route('/')
  .post(upload.single('mainImage'), createProduct)
  .get(getProduct);

router
  .route('/:id')
  .get(getOneProduct)
  .put(upload.single('mainImage'), updateProduct)
  .delete(removeProduct);

router
  .route('/otherImages/:productId')
  .post(upload.array('otherImages', 4), uploadOtherImages);

export default router;

export default router;
