import Color from '../models/color.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createColor = asyncHandler(async (req, res) => {
  const { name } = req.body;

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
    .json(new ApiResponse(200, {}, 'Color created successfully'));
});

export const updateColor = asyncHandler(async (req, res) => {
  const { colorId } = req.params;

  if (!colorId) {
    throw new ApiError(400, 'Color ID is required');
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
    .json(new ApiResponse(200, color, 'Color data updated successfully'));
});

export const listColors = asyncHandler(async (req, res) => {
  const colors = await Color.find();

  return res
    .status(200)
    .json(new ApiResponse(200, colors, 'Colors fetched successfully'));
});
