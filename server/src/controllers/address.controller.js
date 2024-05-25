import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Address from '../models/address.model.js';
import { availableUserRoles } from '../constants.js';

export const createAdress = asyncHandler(async (req, res) => {
  const { address, city, pincode, state, country } = req.body;
  const { ownerId } = req.params;
  const user = await req.user;

  if (!address || !city || !pincode || !state || !country || !ownerId) {
    throw new ApiError('All fields are required', 400);
  }

  if (ownerId != user._id && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const addressCreated = await Address.create({
    address,
    city,
    pincode,
    state,
    country,
    ownerId,
  });

  if (!addressCreated) {
    throw new ApiError('Failed to create addresss, please try again', 500);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, 'Address created successfully', addressCreated));
});

export const getAllUserAddress = asyncHandler(async (req, res) => {
  const user = await req.user;

  if (user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const allAddress = await Address.find({});

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'All address retrieved successfully', allAddress)
    );
});

export const getOneUserAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const user = await req.user;

  const address = await Address.findById(addressId);

  if (!address) {
    throw new ApiError(`Address with id ${addressId} not found`, 404);
  }

  if (address.owner != user._id && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Address retrieved successfully', address));
});

export const updateAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const { address, city, pincode, state, country } = req.body;
  const user = await req.user;

  const findAddress = await Address.findById(addressId);

  if (!findAddress) {
    throw new ApiError('Address not found', 404);
  }

  if (findAddress.owner != user._id && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  if (address) {
    findAddress.address = address;
  }
  if (city) {
    findAddress.city = city;
  }
  if (pincode) {
    findAddress.pincode = pincode;
  }
  if (state) {
    findAddress.state = state;
  }
  if (country) {
    findAddress.country = country;
  }

  const addressUpdared = await findAddress.save();

  return res
    .status(200)
    .json(new ApiResponse(200, 'Address updated successfully', addressUpdared));
});

export const removeAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const user = await req.user;

  const address = await Address.findById(addressId);
  if (!address) {
    throw new ApiError('Address not found', 404);
  }

  if (address.owner != user._id && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  await Address.findByIdAndDelete(address);

  return res
    .status(200)
    .json(new ApiResponse(200, 'Address deleted successfully'));
});
