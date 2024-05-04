import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import {
  addCarousel,
  deleteCarousel,
  getCarousel,
} from '../controllers/carousel.model.js';

const router = Router();

router
  .route('/addCarousel')
  .post(verifyJWT, upload.single('image'), addCarousel);
router.route('/getCarousel').post(getCarousel);
router.route('/deleteCarousel').post(verifyJWT, deleteCarousel);

export default router;
