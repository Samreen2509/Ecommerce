import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      required: true,
      type: {
        url: String,
        public_id: String,
        url: String,
        secure_url: String,
        width: Number,
        height: Number,
        format: String,
      },
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('categories', categorySchema);

export default Category;
