import { Router } from 'express';
import {
  deleteAllNotification,
  deleteNotification,
  getAllNotification,
  getNotification,
  updateAllNotification,
  updateNotification,
} from '../controllers/notification.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router
  .route('/')
  .get(verifyJWT, getAllNotification)
  .put(verifyJWT, updateAllNotification)
  .delete(verifyJWT, deleteAllNotification);

router
  .route('/:id')
  .get(verifyJWT, getNotification)
  .put(verifyJWT, updateNotification)
  .delete(verifyJWT, deleteNotification);

export default router;
