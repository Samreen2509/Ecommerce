import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImagePreview from '../Utils/ImagePreview';
import { useDispatch, useSelector } from 'react-redux';

import {
  addOtherImages,
  deleteOtherImages,
  getOneProduct,
} from '../../../features/productSlice';

function ProductEditOtherImages({ id, edit, otherImages }) {
  const [otherImage, setOtherImage] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [deleteImage, setDeleteImage] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const { singleProduct, isLoading } = useSelector((state) => state.product);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (otherImages == 'false') {
      navigate('./');
    }

    dispatch(getOneProduct({ productId: id }));
  }, [id]);

  useEffect(() => {
    if (singleProduct) {
      setOtherImage(singleProduct.otherImages);
    }
  }, [singleProduct]);

  useEffect(() => {
    if (uploadFiles.length >= 4) {
      setShowInput(false);
    }

    if (uploadFiles.length < 4) {
      setShowInput(true);
    }
  }, [uploadFiles]);

  const handleInputChange = (e) => {
    const file = e.target.files[0];

    setOtherImage((prevState) => {
      const newImages = [...prevState];
      newImages.push({ image: file, imageName: file.name });
      return newImages;
    });

    setUploadFiles((prevState) => {
      const newImages = [...prevState];
      newImages.push({ otherImage: file });
      return newImages;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(uploadFiles);

    const formData = new FormData();
    uploadFiles.length > 0 &&
      uploadFiles.forEach((fileObj) => {
        formData.append(`otherImage`, fileObj.otherImage);
      });

    uploadFiles.length > 0 && dispatch(addOtherImages({ id, formData }));
    deleteImage.length > 0 &&
      deleteImage.map((imageId) => {
        dispatch(deleteOtherImages({ id, imageId }));
      });

    if (!isLoading) {
      // navigate('./');
    }
  };

  const handleClearImage = (index) => {
    const imageId = otherImage[index]?._id;
    if (imageId) {
      setDeleteImage((prevIds) => [...prevIds, imageId]);
    }

    let temp = otherImage[index].image;
    let indexUploadItem = uploadFiles.findIndex(
      (uploadItem) => uploadItem.otherImage == temp
    );

    if (indexUploadItem !== -1) {
      const newUploadImage = [...uploadFiles];
      newUploadImage.splice(index, 1);
      setUploadFiles(newUploadImage);
    }
    const newOtherImage = [...otherImage];
    newOtherImage.splice(index, 1);
    setOtherImage(newOtherImage);
  };

  const handlePreviewImage = (index, secure_url) => {
    if (!secure_url) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(otherImage[index].image);
    }

    secure_url && setImagePreview(secure_url);
    setIsPreviewVisible(true);
  };

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-10">
          <div className="flex w-full flex-col">
            {otherImage?.map((item, index) => (
              <div
                key={index}
                className="mb-3 flex h-10 w-full items-center justify-center rounded-md px-2"
              >
                <h1 className="w-full">
                  {item?.public_id ? item.public_id : item.imageName}
                </h1>
                <div
                  onClick={() => handleClearImage(index)}
                  className="mx-3 flex h-full w-20 cursor-pointer items-center justify-center rounded-md border border-gray-400 hover:bg-gray-200"
                >
                  Clear
                </div>
                <div
                  onClick={() => handlePreviewImage(index, item?.secure_url)}
                  className="flex h-full w-20 cursor-pointer items-center justify-center rounded-md border-gray-400 bg-gray-800 text-white hover:bg-gray-700"
                >
                  View
                </div>
              </div>
            ))}
            {showInput && (
              <>
                <label htmlFor="otherImage">Other Images</label>
                <input
                  type="file"
                  id="otherImage"
                  name="otherImage"
                  placeholder="Product OtherImage Image"
                  className="flex h-10 w-full items-center justify-start rounded-md border border-gray-400 px-2 py-2 text-base"
                  onChange={handleInputChange}
                  ref={fileInputRef}
                />
              </>
            )}
          </div>

          {isPreviewVisible && (
            <ImagePreview
              image={imagePreview}
              onClose={() => setIsPreviewVisible(false)}
            />
          )}

          <div className="my-5 flex items-center justify-start gap-x-3">
            <div className="flex h-10 w-36 cursor-pointer items-center justify-center rounded-md border border-gray-400 hover:bg-gray-200">
              <Link
                to="./"
                className="flex h-full w-full items-center justify-center"
              >
                Cancel
              </Link>
            </div>
            <div
              // type="submit"
              onClick={handleFormSubmit}
              className="flex h-10 w-36 cursor-pointer items-center justify-center rounded-md border border-gray-800 bg-gray-800 text-white hover:border-gray-700 hover:bg-gray-700"
            >
              {edit == 'true' ? 'Update' : 'Edit'}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProductEditOtherImages;
