import mongoose, { Schema } from 'mongoose';

const colorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hexCode: {
      type: String,
    },
  },
  { timestamps: true }
);

const Color = mongoose.model('colors', colorSchema);
export default Color;
