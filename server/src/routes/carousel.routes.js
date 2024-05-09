import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import {
  addCarousel,
  deleteCarousel,
  getCarousel,
} from '../controllers/carousel.controllers.js';

const router = Router();

router
  .route('/')
  .get(getCarousel)
  .post(verifyJWT, upload.single('image'), addCarousel);
router.route('/:id').delete(verifyJWT, deleteCarousel);

export default router;
