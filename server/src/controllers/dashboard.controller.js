import Category from '../models/category.model.js';
import Color from '../models/color.model.js';
import Order from '../models/order.model.js';
import Payment from '../models/payment.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const count = asyncHandler(async (req, res) => {
  const productCount = await Product.countDocuments();
  const userCount = await User.countDocuments();
  const orderCount = await Order.countDocuments();
  const categoryCount = await Category.countDocuments();
  const colorCount = await Color.countDocuments();
  const paymentCount = await Payment.countDocuments();
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        productCount,
        userCount,
        orderCount,
        categoryCount,
        colorCount,
        paymentCount,
      },
      'Counting done successfully'
    )
  );
});
