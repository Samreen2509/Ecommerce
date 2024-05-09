import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Category from '../models/category.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const img = req.file;

  if (!name || !img) {
    throw new ApiError(400, 'All fields are required');
  }

  const uploadedImg = await uploadOnCloudinary(img.path, {
    folder: 'category-images',
  });

  if (!uploadedImg) {
    throw new ApiError(500, 'Error occured while uploading the image');
  }
  const category = await Category.create({
    name,
    image: {
      url: uploadedImg.url,
      public_id: uploadedImg.public_id,
      secure_url: uploadedImg.secure_url,
      width: uploadedImg.width,
      height: uploadedImg.height,
      format: uploadedImg.format,
    },
  });

  if (!category) {
    throw new ApiError(500, 'Failed to create category, please try again');
  }

  return res
    .status(201)
    .json(new ApiResponse(201, category, 'Category created successfully'));
});

export const getAllCategory = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const category = await Category.find({}).skip(skip).limit(limit);

  return res
    .status(200)
    .json(new ApiResponse(200, category, 'Category retrieved successfully'));
});

export const getOneCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, `Category with id ${id} not found`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, 'Category retrieved successfully'));
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, `Category with id ${id} not found`);
  }

  if (name) {
    category.name = name;
  }

  await category.save();

  return res
    .status(200)
    .json(new ApiResponse(200, category, 'Category updated successfully'));
});

// export const removeCategory = asyncHandler(async (req, res) => {
//   const { categoryId } = req.params;

//   const category = await Category.findById(categoryId);

//   if (!category) {
//     throw new ApiError(404, `Category with id ${id} not found`);
//   }

//   await Category.findByIdAndDelete(categoryId);

//   return res
//     .status(200)
//     .json(new ApiResponse(200, {}, 'Category deleted successfully'));
// });
