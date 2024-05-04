import mongoose, { Schema } from 'mongoose';
import { availableUserRoles, availableUserRolesEnum } from '../constants.js';
import Cart from './cart.model.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
    },
    avatar: {
      type: {
        url: String,
        public_id: String,
        secure_url: String,
        width: Number,
        height: Number,
        format: String,
      },
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: availableUserRolesEnum,
      default: availableUserRoles.USER,
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// userSchema.post('save', async function (user, next) {
//   const cart = await Cart.findOne({ owner: user._id });
//
//   // Setup necessary ecommerce models for the user
//
//   if (!cart) {
//     await Cart.create({
//       owner: user._id,
//       items: [],
//     });
//   }
// });

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateTemporaryToken = function () {
  // This token should be client facing
  // for example: for email verification unHashedToken should go into the user's mail
  const unHashedToken = crypto.randomBytes(20).toString('hex');

  // This should stay in the DB to compare at the time of verification
  const hashedToken = crypto
    .createHash('sha256')
    .update(unHashedToken)
    .digest('hex');
  // This is the expiry time for the token (20 minutes)
  const tokenExpiry = Date.now() + process.env.USER_TEMPORARY_TOKEN_EXPIRY;

  return { unHashedToken, hashedToken, tokenExpiry };
};

const User = new mongoose.model('users', userSchema);

export default User;