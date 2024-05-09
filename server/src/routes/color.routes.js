import { Router } from 'express';
import {
  createColor,
  listColors,
  updateColor,
} from '../controllers/color.controller.js';

const router = Router();

router.route('/listcolors').get(listColors);

router.route('/savecolor').post(createColor);

router.route('/updatecolor/:colorId').put(updateColor);
export default router;
