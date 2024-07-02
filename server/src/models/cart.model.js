import mongoose, { Schema } from 'mongoose';

const cartSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
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
            min: [1, 'Quantity cannot be less than 1'],
            default: 1,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Cart = new mongoose.model('carts', cartSchema);
export default Cart;
