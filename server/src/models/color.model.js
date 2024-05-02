import mongoose, { Schema } from 'mongoose';

const colorSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Color = mongoose.model('colors', colorSchema);
export default Color;
