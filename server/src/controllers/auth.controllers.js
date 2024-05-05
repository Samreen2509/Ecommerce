import {
  CLIENT_BASEPATH,
  EMAIL_VERIFY_PAGE,
  RESET_PASS_PAGE,
  availableUserRoles,
} from '../constants.js';

import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { SendEmail } from '../utils/SendMail.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from '../utils/cloudinary.js';

const ignoreFields =
  '-password -refreshToken -emailVerificationExpiry -emailVerificationToken -createdAt -updatedAt';
const cookieOptions = {
  httpOnly: true,
  secure: true,
};

const findUser = async (username, email) => {
  try {
    return await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
  } catch (error) {
    throw new ApiError(500, `Something went wrong error - ${error}`);
  }
};

const generateToken = async (user) => {
  try {
    const verificationToken = await user.generateTemporaryToken();
    const { unHashedToken, hashedToken, tokenExpiry } = verificationToken;

    const now = new Date();
    const addTime = 20 * 60 * 1000;
    const expiry = new Date(now.getTime() + addTime);

    return { unHashedToken, hashedToken, tokenExpiry, expiry };
  } catch (error) {
    throw new ApiError(500, `Something went wrong error - ${error}`);
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = await req.body;

  if (!name || !username || !email || !password) {
    throw new ApiError(400, 'missing required fields');
  }

  const existingUser = await findUser(username, email);

  if (existingUser) {
    if (existingUser.email === email) {
      throw new ApiError(409, 'email already exists');
    }

    if (existingUser.username === username) {
      throw new ApiError(409, 'username already taken');
    }
  }

  const data = {
    name: name,
    email: email,
    username: username.toLowerCase(),
    password: password,
  };

  const newUser = await User.create(data);

  if (!newUser) {
    throw new ApiError(500, 'something went worng');
  }

  const token = await generateToken(newUser);
  const newUserInfo = await User.findByIdAndUpdate(
    newUser._id,
    {
      $set: {
        emailVerificationToken: token.hashedToken,
        emailVerificationExpiry: token.expiry,
      },
    },
    { new: true }
  ).select(ignoreFields);

  const emailData = {
    email: newUserInfo.email,
    template: 'ConfirmEmail',
    url: `${CLIENT_BASEPATH}${EMAIL_VERIFY_PAGE}?token=${token.unHashedToken}`,
    subject: 'Email Verification',
  };
  await SendEmail(emailData);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userInfo: newUserInfo },
        'user registered successfully'
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = await req.body;

  if (!email && !username) {
    throw new ApiError(400, 'missing required fields');
  }

  if (!password) {
    throw new ApiError(400, 'missing required fields');
  }

  const user = await findUser(username, email);

  if (!user) {
    throw new ApiError(404, 'user not found');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(500, 'invalid credentials');
  }

  if (!user.isEmailVerified) {
    const currentDate = new Date();
    const tokenExpired = user?.emailVerificationExpiry < currentDate;

    if (!tokenExpired) {
      throw new ApiError(
        310,
        'your email has not been verified. A verification link already sent to your email address'
      );
    }

    const token = await generateToken(user);
    const emailData = {
      email: user.email,
      template: 'ConfirmEmail',
      url: `${CLIENT_BASEPATH}${EMAIL_VERIFY_PAGE}?token=${token.unHashedToken}`,
      subject: 'Email Verification',
    };

    await SendEmail(emailData);

    await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          emailVerificationToken: token.hashedToken,
          emailVerificationExpiry: token.expiry,
        },
      },
      { new: true }
    );

    throw new ApiError(
      310,
      'your email has not been verified. A verification link has been sent to your email address'
    );
  }

  const refreshToken = await user.generateRefreshToken();
  const accessToken = await user.generateAccessToken();

  const loggedInUserInfo = await User.findByIdAndUpdate(
    user?._id,
    { $set: { refreshToken: refreshToken } },
    { new: true }
  ).select(ignoreFields);

  return res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          userInfo: loggedInUserInfo,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        'user login successfully'
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
        emailVerificationToken: 1,
        emailVerificationExpiry: 1,
        forgotPasswordToken: 1,
        forgotPasswordExpiry: 1,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie('accessToken', cookieOptions)
    .clearCookie('refreshToken', cookieOptions)
    .json(new ApiResponse(200, 'user logged out'));
});

export const refreshUserToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;

  if (!token) {
    throw new ApiError(401, 'unauthorized request');
  }

  const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(decodedToken._id);

  if (!user) {
    await User.findByIdAndUpdate(
      req.user?._id,
      {
        $unset: {
          refreshToken: 1,
          emailVerificationToken: 1,
          emailVerificationExpiry: 1,
          forgotPasswordToken: 1,
          forgotPasswordExpiry: 1,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .clearCookie('accessToken', cookieOptions)
      .clearCookie('refreshToken', cookieOptions)
      .json(new ApiResponse(200, 'user logged out'));
  }

  const newRefreshToken = await user.generateRefreshToken();
  const newAccessToken = await user.generateAccessToken();

  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: newRefreshToken,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .cookie('accessToken', newAccessToken, cookieOptions)
    .cookie('refreshToken', newRefreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
        'access token refreshed'
      )
    );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, { userInfo: req.user }, 'user fetched successfully')
    );
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await req.user;
  const { whose } = await req?.body;

  let deleteUser = user;
  console.log(user);
  console.log(whose);
  if (user.role == availableUserRoles.ADMIN && whose) {
    deleteUser = await findUser(whose?.username, whose?.email);
  }

  console.log(deleteUser);
  if (whose && user.role === availableUserRoles.USER) {
    deleteUser = false;
  }

  console.log(deleteUser);
  if (!deleteUser) {
    throw new ApiError(500, "you don't have access");
  }

  const deletedUser = await User.findByIdAndDelete(deleteUser?._id);
  if (!deletedUser) {
    throw new ApiError(500, 'something went worng');
  }

  if (deleteUser._id == user._id) {
    return res
      .status(200)
      .clearCookie('accessToken', cookieOptions)
      .clearCookie('refreshToken', cookieOptions)
      .json(new ApiResponse(200, 'user deleted successfully'));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'user deleted successfully'));
});

export const changeUserPass = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, 'invalid old password');
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        password: await bcrypt.hash(newPassword, 10),
      },
    },
    { new: true }
  ).select('-password -refreshToken');

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userInfo: updatedUser },
        'password changed successfully'
      )
    );
});

export const updateAccountDetails = asyncHandler(async (req, res) => {
  const { name, username, email, role, whose } = req.body;

  let user;
  let updaterUser = req?.user;
  if (whose) {
    const whoseUser = await findUser(username, email);
    user = whoseUser;
  } else {
    user = req?.user;
  }

  if (!name && !username && !email) {
    throw new ApiError(404, 'no update data provided');
  }

  const updateData = {};

  if (name) {
    updateData.name = name;
  }

  if (username) {
    updateData.username = username;
  }

  if (email) {
    const token = await generateToken(user);
    const emailData = {
      email: user.email,
      template: 'ConfirmEmail',
      url: `${CLIENT_BASEPATH}${EMAIL_VERIFY_PAGE}?token=${token.unHashedToken}`,
      subject: 'Email Verification',
    };
    await SendEmail(emailData);

    updateData.email = email;
    updateData.isEmailVerified = false;
    updateData.emailVerificationToken = token.hashedToken;
    updateData.emailVerificationExpiry = token.expiry;
  }

  if (role && updaterUser.role == availableUserRoles.ADMIN) {
    if (availableUserRoles.hasOwnProperty(role)) {
      updateData.role = availableUserRoles[role];
    }
  }

  const userInfo = await User.findByIdAndUpdate(
    user._id,
    { $set: updateData },
    { new: true }
  ).select(ignoreFields);

  const message = `details updated. ${email ? 'email verification link sent to your new email' : ''}`;
  return res
    .status(200)
    .json(new ApiResponse(200, { userInfo: userInfo }, message));
});

export const forgotPasswordLink = asyncHandler(async (req, res) => {
  const { email, username } = req.body;

  if (!email && !username) {
    throw new ApiError(400, 'missing required fields');
  }

  const user = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (!user) {
    throw new ApiError(404, 'user not found');
  }

  const token = await generateToken(user);
  const emailData = {
    email: user.email,
    template: 'ForgotPassword',
    url: `${CLIENT_BASEPATH}${RESET_PASS_PAGE}?token=${token.unHashedToken}`,
    subject: 'Reset Your Password',
  };

  await SendEmail(emailData);
  await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        forgotPasswordToken: token.hashedToken,
        forgotPasswordExpiry: token.expiry,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userInfo: user.email },
        'A Password Reset link has been sent to your email address'
      )
    );
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    throw new ApiError(404, 'missing required fields');
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
  });

  if (!user) {
    throw new ApiError(404, 'user not found');
  }

  const currentDate = new Date();
  const tokenExpired = user.forgotPasswordExpiry < currentDate;

  if (tokenExpired) {
    throw new ApiError(500, 'token has expired');
  }

  await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        password: await bcrypt.hash(password, 10),
      },
      $unset: {
        forgotPasswordToken: 1,
        forgotPasswordExpiry: 1,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, 'password changed successfully'));
});

export const emailVerify = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new ApiError(404, 'token not found');
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  console.log(hashedToken);

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
  });

  if (!user) {
    throw new ApiError(404, 'user not found');
  }

  const currentDate = new Date();
  const tokenExpired = user.emailVerificationExpiry < currentDate;

  if (tokenExpired) {
    throw new ApiError(500, 'token has expired');
  }

  await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        isEmailVerified: true,
      },
      $unset: {
        emailVerificationToken: 1,
        emailVerificationExpiry: 1,
      },
    },
    { new: true }
  );

  return res.status(200).json(200, 'user verified successfully');
});

export const uploadAvatar = asyncHandler(async (req, res) => {
  const uploadedFile = await req.file;
  let jsonData;
  if (req.body?.data) {
    jsonData = JSON.parse(req.body?.data);
  }
  const user = await req.user;
  let changeAvatarUser = user;

  if (user.role == availableUserRoles.ADMIN && jsonData && jsonData?.whose) {
    changeAvatarUser = await findUser(
      jsonData.whose?.username,
      jsonData.whose?.email
    );
  }

  if (!uploadedFile) {
    throw new ApiError(400, 'no file uploaded');
  }

  const uploadOptions = {
    folder: 'avatar',
    // gravity: 'faces',
    width: 200,
    height: 200,
    crop: 'fit',
  };

  const img = await uploadOnCloudinary(uploadedFile.path, uploadOptions);
  if (!img) {
    throw new ApiError(500, `something went worng error`);
  }

  if (img.http_code === 400) {
    throw new ApiError(500, `error uploading image: ${img?.message}`);
  }

  const avatarData = {
    url: img.url,
    public_id: img.public_id,
    secure_url: img.secure_url,
    width: img.width,
    height: img.height,
    format: img.format,
  };

  const updatedUser = await User.findByIdAndUpdate(
    changeAvatarUser._id,
    {
      $set: {
        avatar: avatarData,
      },
    },
    { new: true }
  ).select(ignoreFields);

  if (!updatedUser) {
    throw new ApiError(500, 'something went worng');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { userInfo: updatedUser }, 'image uploaded'));
});

export const deleteAvatar = asyncHandler(async (req, res) => {
  const user = await req.user;
  const { whose } = await req?.body;

  let deleteAvatarUser = user;
  if (user.role == availableUserRoles.ADMIN && whose) {
    deleteAvatarUser = await findUser(whose?.username, whose?.email);
  }

  const deleteAvatarOnCloud = await deleteFromCloudinary(
    deleteAvatarUser.avatar?.public_id
  );

  if (!deleteAvatarOnCloud) {
    throw new ApiError(500, `something went worng error`);
  }

  if (deleteAvatarOnCloud.http_code === 400) {
    throw new ApiError(
      500,
      `error deleting image: ${deleteAvatarOnCloud?.message}`
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    deleteAvatarUser._id,
    {
      $unset: {
        avatar: 1,
      },
    },
    { new: true }
  ).select(ignoreFields);

  return res
    .status(200)
    .json(new ApiResponse(200, { userInfo: updatedUser }, 'image deleted'));
});
