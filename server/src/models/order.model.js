import mongoose, { Schema } from 'mongoose';
import { orderStatusEnum } from '../constants.js';

const orderSchema = new Schema({
  orderPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  items: {
    type: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'products',
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity can not be less then 1.'],
          default: 1,
        },
        size: {
          type: String,
        },
      },
    ],
    default: [],
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'addresses',
  },
  status: {
    type: String,
    enum: orderStatusEnum,
  },
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: 'payments',
  },
  isPaymentDone: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model('orders', orderSchema);
export default Order;
