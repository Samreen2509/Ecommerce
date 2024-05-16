import mongoose, { Schema } from 'mongoose';

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
    type: Boolean,
    required: true,
    default: false,
  },
});

const Payment = mongoose.model('payments', paymentSchema);
export default Payment;
