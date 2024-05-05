import { Router } from 'express';
import {
  createProduct,
  updateProduct,
  removeProduct,
  uploadMainImage,
  uploadOtherImages,
  getProduct,
  getOneProduct,
} from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/').post(createProduct).get(getProduct);

router
  .route('/:id')
  .get(getOneProduct)
  .put(updateProduct)
  .delete(removeProduct);

router
  .route('/mainImage/:productId')
  .post(upload.single('mainImage'), uploadMainImage);

router
  .route('/otherImages/:productId')
  .post(upload.array('otherImages', 4), uploadOtherImages);

export default router;
