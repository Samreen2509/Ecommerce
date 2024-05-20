import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.header('Authorization')?.replace('Bearer ', '');

  const refreshToken =
    req.cookies?.refreshToken ||
    req.header('Authorization')?.replace('Bearer ', '');

  if (!accessToken || !refreshToken) {
    throw new ApiError(401, 'unauthorized request');
  }

  const decodedAccessToken = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );
  const decodedRefreshToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (decodedAccessToken._id != decodedRefreshToken._id) {
    throw new ApiError(401, 'invalid user');
  }

  const user = await User.findById(decodedAccessToken._id).select(
    '-password -refreshToken'
  );

  if (!user) {
    throw new ApiError(401, 'invalid access token');
  }

  req.user = user;
  next();
});
