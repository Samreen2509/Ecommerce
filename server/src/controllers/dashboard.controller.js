import Category from '../models/category.model.js';
import Color from '../models/color.model.js';
import Order from '../models/order.model.js';
import Payment from '../models/payment.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const count = asyncHandler(async (req, res) => {
  const product = await Product.countDocuments();
  const user = await User.countDocuments();
  const order = await Order.countDocuments();
  const category = await Category.countDocuments();
  const color = await Color.countDocuments();
  const payment = await Payment.countDocuments();
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        product,
        user,
        order,
        category,
        color,
        payment,
      },
      'counting done successfully'
    )
  );
});
