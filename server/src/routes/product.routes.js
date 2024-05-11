import { Router } from 'express';
import {
  createProduct,
  updateProduct,
  removeProduct,
  uploadOtherImages,
  getProduct,
  getOneProduct,
  filterProducts,
} from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router
  .route('/')
  .post(upload.single('mainImage'), createProduct)
  .get(getProduct);

router.route('/filterproducts').get(filterProducts);

router
  .route('/otherImages/:productId')
  .post(upload.array('otherImages', 4), uploadOtherImages);

router
  .route('/:id')
  .get(getOneProduct)
  .put(upload.single('mainImage'), updateProduct)
  .delete(removeProduct);

export default router;
