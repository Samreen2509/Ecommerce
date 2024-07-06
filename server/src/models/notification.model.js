import mongoose, { Schema } from 'mongoose';

const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    notification: {
      type: String,
      required: true,
    },
    markAsRead: {
      type: Boolean,
      default: false,
      require: true,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model('notifications', notificationSchema);
export default Notification;
