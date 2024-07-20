/*
    // localFilePath is a string which is the path of the image in our local system (This is going to be generated automatically by multer just need to pass it while using the function)

    // the uploadOptions is an object
    type uploadOptions = {
        // required
        folder: "path/of/folder/on/cloudinary",
        // optional
        gravity:'faces' (this will crop the image and only show the faces in image. good for storing profile pictures. NOTE:- Not going to use everywherer),
        width:number,
        height:number
        crop:string,
    }
*/

import fs from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';
// import { config } from 'process';
// config()

const cloudConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
};

export const uploadOnCloudinary = async (localFilePath, uploadOptions) => {
  try {
    cloudConfig();

    if (!localFilePath) {
      console.log('Local file path is missing');
      return null;
    }

    const res = await cloudinary.uploader.upload(localFilePath, uploadOptions);
    //   all the fields we need according to our schema, will be in the res.
    fs.rm(localFilePath);
    return res;
  } catch (error) {
    fs.rm(localFilePath);
    return error;
  }
};

/*
    deleteFromCloudinary is a function which will be used to remove the related images if any product or other item is deleted.
*/

export const deleteFromCloudinary = async (public_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      cloudConfig();
      const result = await cloudinary.uploader.destroy(public_id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
