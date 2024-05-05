import { availableUserRoles } from '../constants.js';
import Carousel from '../models/carousel.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from '../utils/cloudinary.js';

export const addCarousel = asyncHandler(async (req, res) => {
  const user = await req.user;
  const uploadedFile = await req.file;

  let jsonData;

  if (req.body?.data) {
    jsonData = JSON.parse(req.body?.data);
  }

  if (user.role != availableUserRoles.ADMIN) {
    throw new ApiError(403, "you don't have access");
  }

  let uploadOptions;
  if (jsonData && jsonData?.uploadOptions) {
    uploadOptions = jsonData.uploadOptions;
  }

  const uploadedImg = await uploadOnCloudinary(
    uploadedFile.path,
    uploadOptions
  );
  if (!uploadedImg) {
    throw new ApiError(500, `something went worng error`);
  }

  console.log(uploadedImg);
  if (uploadedImg.http_code === 400) {
    throw new ApiError(500, `error uploading image: ${img?.message}`);
  }

  const carouselImgData = {
    url: uploadedImg.url,
    public_id: uploadedImg.public_id,
    secure_url: uploadedImg.secure_url,
    width: uploadedImg.width,
    height: uploadedImg.height,
    format: uploadedImg.format,
  };

  const newCarousel = await Carousel.create({ img: carouselImgData });
  console.log(newCarousel);
  if (!newCarousel) {
    throw new ApiError(500, 'something went worng');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { carouselInfo: newCarousel },
        'new carousel uploaded'
      )
    );
});

export const deleteCarousel = asyncHandler(async (req, res) => {
  const user = await req.user;
  const { id } = await req?.body;

  if (!id) {
    throw new ApiError(404, 'missing required fields id');
  }

  if (user.role != availableUserRoles.ADMIN) {
    throw new ApiError(403, "you don't have access");
  }

  const carouselData = await Carousel.findById(id);
  if (!carouselData) {
    throw new ApiError(404, 'carousel not found');
  }

  const deleteCarouselOnCloud = await deleteFromCloudinary(
    carouselData?.img.public_id
  );

  if (!deleteCarouselOnCloud) {
    throw new ApiError(
      500,
      { error: deleteCarouselOnCloud },
      `something went worng error`
    );
  }

  if (deleteCarouselOnCloud.http_code === 400) {
    throw new ApiError(
      500,
      `error deleting carousel: ${deleteAvatarOnCloud?.message}`
    );
  }

  const deletedCarousel = await Carousel.findByIdAndDelete(carouselData?._id);
  if (!deletedCarousel) {
    throw new ApiError(500, 'something went worng');
  }

  return res.status(200).json(new ApiResponse(200, 'carousel deleted'));
});

export const getCarousel = asyncHandler(async (_, res) => {
  const carouselData = await Carousel.find();
  if (!carouselData) {
    throw new ApiError(404, 'not found any carousel');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { carouselInfo: carouselData }, 'carousel found')
    );
});
