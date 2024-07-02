import { availableUserRoles } from '../constants.js';
import Color from '../models/color.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createColor = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const user = await req.user;

  if (!name) {
    throw new ApiError(404, 'name not found');
  }

  if (user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const colorExists = await Color.findOne({ name });

  if (colorExists) {
    throw new ApiError(400, 'Color already exists');
  }

  const color = await Color.create({
    ...req.body,
  });

  if (!color) {
    throw new ApiError(
      500,
      'Some error occured while storing color into the database'
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { colorInfo: color }, 'Color created successfully')
    );
});

export const updateColor = asyncHandler(async (req, res) => {
  const { colorId } = req.params;
  const user = await req.user;

  if (!colorId) {
    throw new ApiError(400, 'Color ID is required');
  }

  if (user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const color = await Color.findByIdAndUpdate(
    colorId,
    { ...req.body },
    { new: true }
  );

  if (!color) {
    throw new ApiError(400, `No color exist with this id - ${colorId}`);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { colorInfo: color },
        'Color data updated successfully'
      )
    );
});

export const listColors = asyncHandler(async (req, res) => {
  const colors = await Color.find();

  return res
    .status(200)
    .json(
      new ApiResponse(200, { colorInfo: colors }, 'Colors fetched successfully')
    );
});

export const deleteColor = asyncHandler(async (req, res) => {
  const { colorId } = await req.params;
  const user = await req.user;

  if (user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const color = await Color.findByIdAndDelete(colorId);
  if (!color) {
    throw new ApiError(500, 'something went worng');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'color deleted successfully'));
});

export const getOneColor = asyncHandler(async (req, res) => {
  const { colorId } = await req.params;

  const color = await Color.findById(colorId);
  if (!color) {
    throw new ApiError(404, 'color not found');
  }

  return res
    .status(200)
    .json(200, { colorInfo: color }, 'color found successfully');
});
