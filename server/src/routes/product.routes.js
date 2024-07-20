import { Router } from 'express';
import {
  createProduct,
  updateProduct,
  removeProduct,
  uploadOtherImages,
  getProduct,
  getOneProduct,
  filterProducts,
  deleteOtherImage,
} from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router
  .route('/')
  .post(verifyJWT, upload.single('mainImage'), createProduct)
  .get(getProduct);

router.route('/filterproducts').get(filterProducts);

router
  .route('/:id')
  .get(getOneProduct)
  .put(verifyJWT, upload.single('mainImage'), updateProduct)
  .delete(verifyJWT, removeProduct);

router
  .route('/otherImages/:productId')
  .post(verifyJWT, upload.array('otherImage', 4), uploadOtherImages);
router
  .route('/otherImages/:productId/:imageId')
  .delete(verifyJWT, deleteOtherImage);

export default router;
