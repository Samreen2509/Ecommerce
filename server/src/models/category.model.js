import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: {
        url: String,
        public_id: String,
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
