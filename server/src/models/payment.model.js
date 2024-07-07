import mongoose, { Schema } from 'mongoose';
import {
  availablePaymentStatus,
  availablePaymentStatusEnum,
} from '../constants.js';

const paymentSchema = new Schema({
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  stripeId: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'orders',
  },
  status: {
    type: String,
    enum: availablePaymentStatusEnum,
    default: availablePaymentStatus.PENDING,
    required: true,
  },
  url: {
    type: String,
  },
});

const Payment = mongoose.model('payments', paymentSchema);
export default Payment;
