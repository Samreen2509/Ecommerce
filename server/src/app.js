// package imports
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// module imports
import { BASEPATH } from './constants.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { ApiResponse } from './utils/ApiResponse.js';
import { ApiError } from './utils/ApiError.js';
import productRoutes from './routes/product.routes.js';
import authRouters from './routes/auth.routes.js';
import carouselRoutes from './routes/carousel.routes.js';
import addressRoutes from './routes/address.routes.js';
import categoryRoutes from './routes/category.routes.js';
import colorRoutes from './routes/color.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import { paymentRoutes, webhookRoutes } from './routes/payment.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';

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

// Test route
// /api/v1/healthcheck
app.get(`${BASEPATH}/healthcheck`, (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200, {}, 'ok'));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message);
  }
});

app.use(`${BASEPATH}/auth`, authRouters);
// Product Routes
app.use(`${BASEPATH}/product`, productRoutes);
// Address Routes
app.use(`${BASEPATH}/address`, addressRoutes);
// Category Routes
app.use(`${BASEPATH}/category`, categoryRoutes);
// Carousel Routes
app.use(`${BASEPATH}/carousel`, carouselRoutes);
// Color Routes
app.use(`${BASEPATH}/color`, colorRoutes);
// Cart Routes
app.use(`${BASEPATH}/cart`, cartRoutes);
// Order Routes
app.use(`${BASEPATH}/order`, orderRoutes);
// Wishlist Routes
app.use(`${BASEPATH}/wishlist`, wishlistRoutes);

app.use(`${BASEPATH}/payment`, paymentRoutes);
app.use(`${BASEPATH}/webhook`, webhookRoutes);

// Error middleware
app.use(errorHandler);

export { app };
