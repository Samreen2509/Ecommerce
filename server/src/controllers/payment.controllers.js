import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const stripeWebhook = asyncHandler(async (req, res) => {
  const x = req.user;
});
