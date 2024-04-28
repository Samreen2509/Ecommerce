import mongoose, { Schema } from 'mongoose';

const cartSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    items: {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
  },
  { timestamps: true }
);

const Cart = new mongoose.model('carts', cartSchema);
export default Cart;
