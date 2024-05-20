/*
  after using this multer middleware this will add image in req object so in the corresponding controller the image can be retrieved using the 'req.file' or 'req.files' according to number of images. if any problem then just log the 'req.file' in the console and you'll get the idea.
*/

import path from 'path';
import multer from 'multer';
import { allowedImgExtensionsEnum } from '../constants.js';

export const upload = multer({
  dest: 'temp/',
  storage: multer.diskStorage({
    destination: 'tmp/',
    filename: (_, file, done) => {
      done(null, file.originalname);
    },
  }),
  fileFilter: (_, file, done) => {
    let ext = path.extname(file.originalname);
    if (!allowedImgExtensionsEnum.includes(ext)) {
      done(new Error(`Unsupported image type! ${ext}`), false);
      return;
    }
    done(null, true);
  },
});
