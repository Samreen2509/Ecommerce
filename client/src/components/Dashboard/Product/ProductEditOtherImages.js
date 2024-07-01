import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImagePreview from '../Utils/ImagePreview';

function ProductEditOtherImages({ id, edit, otherImages }) {
  const [otherImage, setOtherImage] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {}, [id, edit]);

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    setOtherImage([...otherImage, file]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleClearImage = (index) => {
    const newImages = [...otherImage];
    newImages.splice(index, 1);
    setOtherImage(newImages);
  };

  const handlePreviewImage = (index) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(otherImage[index]);
    setIsPreviewVisible(true);
  };

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-10">
          <div className="flex w-full flex-col">
            <label htmlFor="otherImages">Other Images</label>
            {otherImage.map((item, index) => (
              <div
                key={index}
                className="mb-2 flex h-10 w-full items-center justify-center rounded-md px-2"
              >
                <h1 className="w-full">name</h1>
                <div
                  onClick={() => handleClearImage(index)}
                  className="mx-3 flex h-full w-20 cursor-pointer items-center justify-center rounded-md border border-gray-400 hover:bg-gray-200"
                >
                  Clear
                </div>
                <div
                  onClick={() => handlePreviewImage(index)}
                  className="flex h-full w-20 cursor-pointer items-center justify-center rounded-md border-gray-400 bg-gray-800 text-white hover:bg-gray-700"
                >
                  View
                </div>
              </div>
            ))}
            <input
              type="file"
              id="mainImage"
              name="mainImage"
              placeholder="Product Main Image"
              className="flex h-10 w-full items-center justify-start rounded-md border border-gray-400 px-2 py-2 text-base"
              onChange={handleAddImage}
              ref={fileInputRef}
            />
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
              type="submit"
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
