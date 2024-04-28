import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mainImage: {
      required: true,
      type: {
        url: String,
        localPath: String,
      },
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    otherImages: {
      type: [
        {
          url: String,
          localPath: String,
        },
      ],
      default: [],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('products', productSchema);
export default Product;
