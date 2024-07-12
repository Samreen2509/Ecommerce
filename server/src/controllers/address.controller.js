import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Address from '../models/address.model.js';
import { availableUserRoles } from '../constants.js';

export const createAdress = asyncHandler(async (req, res) => {
  const { address, city, pincode, state, country } = req.body;
  const { userId } = req.params;
  const user = await req.user;

  if (!address || !city || !pincode || !state || !country) {
    throw new ApiError('All fields are required', 400);
  }

  if (userId != user._id && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const addressCreated = await Address.create({
    address: address,
    city: city,
    pincode: pincode,
    state: state,
    country: country,
    owner: userId,
  });

  if (!addressCreated) {
    throw new ApiError('Failed to create addresss, please try again', 500);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { addressInfo: addressCreated },
        'Address created successfully'
      )
    );
});

export const getAllAddress = asyncHandler(async (req, res) => {
  const user = await req.user;

  if (user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const address = await Address.find({}).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { addressInfo: address },
        'All address retrieved successfully'
      )
    );
});

export const getUserAddress = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await req.user;

  if (user._id != userId && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const address = await Address.find({
    owner: userId,
  }).sort({ createdAt: -1 });

  if (!address) {
    throw new ApiError(404, "user's address not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { addressInfo: address }, 'All address retrieved')
    );
});

export const getOneAddress = asyncHandler(async (req, res) => {
  const { userId, addressId } = req.params;
  const user = await req.user;

  if (user._id != userId && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const address = await Address.findById(addressId);

  if (!address) {
    throw new ApiError(`Address with id ${addressId} not found`, 404);
  }

  if (address.owner != user._id && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { addressInfo: address },
        'Address retrieved successfully'
      )
    );
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

  if (!addressUpdared) {
    throw new ApiError(500, 'something went worng');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { addressInfo: addressUpdared },
        'Address updated successfully'
      )
    );
});

export const removeAddress = asyncHandler(async (req, res) => {
  const { userId, addressId } = req.params;
  const user = await req.user;

  if (userId != user._id && user.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const address = await Address.findById(addressId);
  if (!address) {
    throw new ApiError('Address not found', 404);
  }

  await Address.findByIdAndDelete(address);

  return res
    .status(200)
    .json(new ApiResponse(200, 'Address deleted successfully'));
});
