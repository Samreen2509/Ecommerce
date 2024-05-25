import mongoose, { Schema } from 'mongoose';

const wishlistSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    items: {
      type: [
        {
          productId: { type: Schema.Types.ObjectId, ref: 'products' },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Wishlist = mongoose.model('wishlists', wishlistSchema);

export default Wishlist;
