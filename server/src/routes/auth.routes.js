import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  refreshUserToken,
  registerUser,
  getUser,
  updateUser,
  getCurrentUser,
  forgotPassword,
  emailVerify,
  forgotPasswordLink,
  uploadAvatar,
  deleteAvatar,
  deleteUser,
} from '../controllers/auth.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);

router.route('/refreshToken').post(refreshUserToken);

router.route('/user').get(verifyJWT, getCurrentUser);
router
  .route('/user/:id')
  .get(verifyJWT, getUser)
  .put(verifyJWT, updateUser)
  .delete(verifyJWT, deleteUser);

router.route('/forgotPassword').post(forgotPasswordLink).put(forgotPassword);
router.route('/emailVerify').post(emailVerify);

router
  .route('/updateAvatar/:id')
  .post(verifyJWT, upload.single('image'), uploadAvatar)
  .delete(verifyJWT, deleteAvatar);

export default router;
