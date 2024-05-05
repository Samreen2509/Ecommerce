import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, size, price, category, color } = req.body;

  if (!name || !description || !size || !price || !category || !color) {
    return next(new ApiError('All fields are required', 400));
  }

  const product = await Product.create({
    name,
    description,
    size,
    price,
    category,
    stock: req.body.stock || 0, // Set stock to 0 if not provided
    color,
  });

  if (!product) {
    return next(
      new ApiError('Failed to create product, please try again', 500)
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, 'Product created successfully', product));
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await Product.find({}).skip(skip).limit(limit);

  return res
    .status(200)
    .json(new ApiResponse(200, 'Products retrieved successfully', products));
});

export const getOneProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ApiError(`Product with id ${id} not found`, 404));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Product retrieved successfully', product));
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    description,
    size,
    price,
    category,
    stock,
    mainImage,
    otherImages,
    color,
  } = req.body;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ApiError('Product not found', 404));
  }

  if (name) {
    product.name = name;
  }
  if (description) {
    product.description = description;
  }
  if (size) {
    product.size = size;
  }
  if (price) {
    product.price = price;
  }
  if (category) {
    product.category = category;
  }
  if (stock) {
    product.stock = stock;
  }
  if (mainImage) {
    product.mainImage = mainImage;
  }
  if (otherImages) {
    product.otherImages = otherImages;
  }
  if (color) {
    product.color = color;
  }

  await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, 'Product updated successfully', product));
});

export const removeProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return next(new ApiError('Product not found', 404));
  }

  await Product.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, 'Product deleted successfully'));
});

export const uploadMainImage = asyncHandler(async (req, res) => {
  const uploadedFile = req.file;
  const { productId } = req.params;
  const { id } = req.params;

  const proDuct = await Product.findById(productId);

  const user = await User.findById(id);

  if (!user || user.role !== availableUserRoles.ADMIN) {
    throw new ApiError(403, 'Only admin users can upload product images');
  }

  if (!uploadedFile) {
    throw new ApiError(400, 'No file uploaded');
  }

  const uploadOptions = {
    folder: 'mainImage',
    width: 800,
    height: 600,
    crop: 'fit',
  };

  const img = await uploadOnCloudinary(uploadedFile.path, uploadOptions);

  if (!img) {
    throw new ApiError(500, 'Something went wrong while uploading the image');
  }

  if (img.http_code === 400) {
    throw new ApiError(500, `Error uploading image: ${img.message}`);
  }

  const imageData = {
    url: img.url,
    public_id: img.public_id,
    secure_url: img.secure_url,
    width: img.width,
    height: img.height,
    format: img.format,
  };

  if (imageData) {
    proDuct.mainImage = imageData;
  }

  await proDuct.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'Image uploaded successfully', { image: imageData })
    );
});

export const uploadOtherImages = asyncHandler(async (req, res) => {
  const uploadedFiles = req.files;
  const { productId } = req.params;
  const { id } = req.params;
  const imageDataArray = [];

  const product = await Product.findById(productId);
  const user = await User.findById(id);

  if (!user || user.role !== availableUserRoles.ADMIN) {
    throw new ApiError(403, 'Only admin users can upload product images');
  }

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  if (!uploadedFiles || uploadedFiles.length === 0) {
    throw new ApiError(400, 'No files uploaded');
  }

  const uploadOptions = {
    folder: 'otherImages',
    width: 800,
    height: 600,
    crop: 'fit',
  };

  for (const uploadedFile of uploadedFiles) {
    const img = await uploadOnCloudinary(uploadedFile.path, uploadOptions);

    if (!img) {
      throw new ApiError(500, 'Something went wrong while uploading the image');
    }

    if (img.http_code === 400) {
      throw new ApiError(500, `Error uploading image: ${img.message}`);
    }

    const imageData = {
      url: img.url,
      public_id: img.public_id,
      secure_url: img.secure_url,
      width: img.width,
      height: img.height,
      format: img.format,
    };

    imageDataArray.push(imageData);
  }

  product.otherImages.push(...imageDataArray);
  await product.save();

  return res.status(200).json(
    new ApiResponse(200, 'Images uploaded successfully', {
      images: imageDataArray,
    })
  );
});
