import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, size, price, stock, category, color } = req.body;
  const uploadedFile = req.file;

  if (
    !name ||
    !description ||
    !size ||
    !price ||
    !category ||
    !color ||
    !uploadedFile
  ) {
    throw new ApiError(400, 'All fields including the');
  }

  const uploadOptions = {
    folder: 'mainImage',
    width: 800,
    height: 600,
    crop: 'fit',
  };

  const img = await uploadOnCloudinary(uploadedFile.path, uploadOptions);

  if (!img || img.http_code === 400) {
    throw new ApiError(500, 'Error uploading image to Cloudinary');
  }

  const productData = {
    name,
    description,
    size,
    price,
    stock,
    category,
    color,
    mainImage: {
      url: img.url,
      public_id: img.public_id,
      secure_url: img.secure_url,
      width: img.width,
      height: img.height,
      format: img.format,
    },
  };

  const product = await Product.create(productData);

  if (!product) {
    throw new ApiError(500, 'Failed to create product');
  }

  return res
    .status(201)
    .json(new ApiResponse(201, product, 'Product created successfully'));
});

export const getProduct = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await Product.find({}).skip(skip).limit(limit);

  return res
    .status(200)
    .json(new ApiResponse(200, products, 'Products retrieved successfully'));
});

export const getOneProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, `Product with id ${id} not found`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, 'Product retrieved successfully'));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const uploadedFile = req.file;
  const { name, description, size, price, category, stock, color } = req.body;

  let imageData;
  if (uploadedFile) {
    const uploadOptions = {
      folder: 'mainImage',
      width: 800,
      height: 600,
      crop: 'fit',
    };
    const img = await uploadOnCloudinary(uploadedFile.path, uploadOptions);
    imageData = {
      url: img.url,
      public_id: img.public_id,
      secure_url: img.secure_url,
      width: img.width,
      height: img.height,
      format: img.format,
    };
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
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
  if (imageData) {
    product.mainImage = imageData;
  }
  if (color) {
    product.color = color;
  }

  await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, 'Product updated successfully', product));
});

export const removeProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError('Product not found', 404);
  }

  await Product.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, 'Product deleted successfully'));
});

export const uploadOtherImages = asyncHandler(async (req, res) => {
  const uploadedFiles = req.files;
  const { productId } = req.params;
  const imageDataArray = [];

  const product = await Product.findById(productId);

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

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { images: imageDataArray },
        'Images uploaded successfully'
      )
    );
});
