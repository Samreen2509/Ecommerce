import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import Product from '../models/product.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { availableUserRoles } from '../constants.js';

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category, color } = req.body;
  let { size } = await req.body;
  const uploadedFile = await req.file;
  const user = await req.user;
  const sizeArray = size.split(',').map((s) => s.trim());

  if (
    !name ||
    !description ||
    !size ||
    !price ||
    !category ||
    !color ||
    !uploadedFile
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  if (user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
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
    size: sizeArray,
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
    .status(200)
    .json(
      new ApiResponse(
        200,
        { productInfo: product },
        'Product created successfully'
      )
    );
});

export const getProduct = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await Product.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { productInfo: products },
        'Products retrieved successfully'
      )
    );
});

export const getOneProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, `Product with id ${id} not found`);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { productInfo: product },
        'Product retrieved successfully'
      )
    );
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const uploadedFile = req.file;
  const { name, description, price, category, stock, color } = req.body;
  let { size } = await req.body;
  const user = await req.user;
  size = size.split(',');

  if (user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

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
    .json(
      new ApiResponse(
        200,
        { productInfo: product },
        'Product updated successfully'
      )
    );
});

export const removeProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await req.user;
  const product = await Product.findById(id);

  if (user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

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
  const user = await req.user;
  const imageDataArray = [];

  if (user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

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
  const productInfo = await product.save();

  if (!productInfo) {
    throw new ApiError(500, 'Something went worng');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { productInfo: productInfo },
        'Images uploaded successfully'
      )
    );
});

export const deleteOtherImage = asyncHandler(async (req, res) => {
  const { productId, imageId } = req.params;
  const user = await req.user;

  if (user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const productData = await Product.findById(productId);
  let otherImages = productData.otherImages;
  otherImages = otherImages.filter((item) => item._id != imageId);

  await Product.findByIdAndUpdate(productId, {
    $set: {
      otherImages: otherImages,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, 'Images deleted successfully'));
});

export const filterProducts = asyncHandler(async (req, res) => {
  const { categoryId, colorId, size, sortBy } = req.query;
  // the multiple sizes have to come in comma separated format like `S,M,L,XL...`
  // the sortBy should be either `high_to_low` or `low_to_high`

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = {};
  if (categoryId) {
    query.category = categoryId;
  }
  if (colorId) {
    query.color = colorId;
  }
  if (size) {
    query.size = { $in: size.split(',') };
  }

  let sort = {};
  if (sortBy === 'low_to_high') {
    sort = { price: 1 };
  } else if (sortBy === 'high_to_low') {
    sort = { price: -1 };
  }

  if (!categoryId && !colorId) {
    throw new ApiError(
      400,
      'Either color or category ID required to filer products'
    );
  }

  const products = await Product.find(query).sort(sort).skip(skip).limit(limit);

  if (!products) {
    throw new ApiError(400, `No items found with the respective filter params`);
  }

  return res.status(200).json(new ApiResponse(200, products, ''));
});
