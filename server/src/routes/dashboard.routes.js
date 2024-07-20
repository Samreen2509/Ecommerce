import express, { Router } from 'express';
import { verifyJWT, verifyPermission } from '../middlewares/auth.middleware.js';
import { availableUserRoles } from '../constants.js';
import { count } from '../controllers/dashboard.controller.js';

const router = Router();

router
  .route('/count-items')
  .get(verifyJWT, verifyPermission([availableUserRoles.ADMIN]), count);

export default router;
