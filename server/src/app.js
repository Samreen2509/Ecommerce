// package imports
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// module imports
import { BASEPATH } from './constants.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { ApiResponse } from './utils/ApiResponse.js';
import { ApiError } from './utils/ApiError.js';
import productRoutes from './routes/product.routes.js'


// constants
const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Product Routes 
app.use(`${BASEPATH}/product`, productRoutes)

// Test route
// /api/v1/healthcheck
app.get(`${BASEPATH}/healthcheck`, (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200, 'ok'));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message);
  }
});

import authRouter from './routes/auth.routes.js';
app.use(`${BASEPATH}/auth`, authRouter);
// Error middleware
app.use(errorHandler);

export { app };
