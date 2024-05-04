import mongoose, { Schema } from 'mongoose';
import { orderStatusEnum } from '../constants';

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
    type: string,
    enum: orderStatusEnum,
  },
  paymentId: {
    type: String,
  },
  isPaymentDone: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model('orders', orderSchema);
export default Order;
