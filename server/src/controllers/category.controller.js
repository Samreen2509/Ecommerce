import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Category from '../models/category.model.js';

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, 'All fields are required');
  }

  const category = await Category.create({ name });

  if (!category) {
    throw new ApiError(500, 'Failed to create addresss, please try again');
  }

  return res
    .status(201)
    .json(new ApiResponse(201, 'Address created successfully', category));
});

export const getAllCategory = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const category = await Category.find({}).skip(skip).limit(limit);

  return res
    .status(200)
    .json(new ApiResponse(200, 'Category retrieved successfully', category));
});

export const getOneCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(`Category with id ${id} not found`, 404);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Category retrieved successfully', category));
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(`Category with id ${id} not found`, 404);
  }

  if (name) {
    category.name = name;
  }

  await category.save();

  return res
    .status(200)
    .json(new ApiResponse(200, 'Category updated successfully', category));
});

export const removeCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(`Category with id ${id} not found`, 404);
  }

  await Category.findByIdAndDelete(categoryId);

  return res
    .status(200)
    .json(new ApiResponse(200, 'Category deleted successfully'));
});
