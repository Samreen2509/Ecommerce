// every field in the img object will come from the response of cloudinary

import mongoose, { Schema } from 'mongoose';

const carouselSchema = new Schema(
  {
    img: {
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
    required: true,
  },
  { timestamps: true }
);

const Carousel = mongoose.model('carousels', carouselSchema);
export default Carousel;
