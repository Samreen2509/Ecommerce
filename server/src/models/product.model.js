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
    size: {
      type: Array,
      default: [],
    },
    mainImage: {
      required: true,
      type: {
        url: String,
        public_id: String,
        secure_url: String,
        width: Number,
        height: Number,
        format: String,
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
          public_id: String,
          secure_url: String,
          width: Number,
          height: Number,
          format: String,
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
      type: Schema.Types.ObjectId,
      ref: 'colors',
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('products', productSchema);
export default Product;
