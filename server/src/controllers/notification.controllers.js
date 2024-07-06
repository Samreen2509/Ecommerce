import Notification from '../models/notification.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllNotification = asyncHandler(async (req, res) => {
  const user = req.user;

  const notifications = await Notification.find({
    user: user._id,
  }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { NotificationInfo: notifications },
        'notification fetched successfully'
      )
    );
});

export const getNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findById(id).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { NotificationInfo: notification },
        'notification fetched successfully'
      )
    );
});

export const updateAllNotification = asyncHandler(async (req, res) => {
  const user = req.user;

  const data = await Notification.find({ user: user_id });

  if (data.length === 0) {
    throw new ApiError(404, 'no notifications found for this user');
  }

  const notification = await Notification.updateMany(
    { user: user._id },
    {
      $set: {
        markAsRead: true,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { NotificationInfo: notification },
        'notification fetched successfully'
      )
    );
});

export const updateNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findByIdAndUpdate(
    id,
    {
      $set: {
        markAsRead: true,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { NotificationInfo: notification },
        'notification fetched successfully'
      )
    );
});

export const deleteAllNotification = asyncHandler(async (req, res) => {
  const user = req.user;

  await Notification.deleteMany({ user: user._id });

  return res
    .status(200)
    .json(new ApiResponse(200, 'notification deleted successfully'));
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await Notification.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, 'notification deleted successfully'));
});
