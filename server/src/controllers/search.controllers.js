import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Product from '../models/product.model.js';

export const searchProduct = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const { item } = req.params;

  if (!q) {
    throw new ApiError(400, 'Query parameter "q" is required');
  }

  const searchResult = await Product.find({
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
    ],
  }).limit(item);

  return res
    .status(200)
    .json(new ApiResponse(200, { searchInfo: searchResult }, 'product data'));
});
