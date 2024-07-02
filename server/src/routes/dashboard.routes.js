import express, { Router } from 'express';
import { count } from '../controllers/count.controller.js';

const router = Router();

router.route('/count').get(count);

export default router;
