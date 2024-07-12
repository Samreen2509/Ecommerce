import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImagePreview from '../Utils/ImagePreview';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  getSingleCategory,
  updateCategory,
} from '../../../features/categorySlice';

function CategoryEditDetails({ id, edit }) {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState({
    name: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const { singleCategory } = useSelector((state) => state.category);
  useEffect(() => {
    if (id == 'new' && edit == 'false') {
      navigate('./');
    }
    if (id !== 'new') {
      dispatch(getSingleCategory({ id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleCategory) {
      setCategoryData({
        name: singleCategory.name,
        image: singleCategory.image,
      });
    }
  }, [singleCategory]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files && files.length > 0) {
      const file = files[0];
      setCategoryData((prevData) => ({
        ...prevData,
        image: file,
        imageName: file.name,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setCategoryData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (id != 'new' && edit != 'true') {
      navigate(`./?id=${id}&edit=true`);
    }

    if (id == 'new' && edit != 'true') {
      navigate('./');
    }

    if (id != 'new' && edit == 'true') {
      dispatch(updateCategory({ id, categoryData }));
      navigate('./');
    }

    if (id == 'new' && edit == 'true') {
      dispatch(addCategory({ categoryData }));
      navigate('./');
    }
  };

  const handleClearImage = () => {
    setCategoryData((prevData) => ({
      ...prevData,
      image: null,
      imageName: '',
    }));
    setImagePreview(null);
    setIsPreviewVisible(false);
  };

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-10">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Category Name"
              className="h-10 rounded-md border border-gray-400 px-2 py-2 text-base"
              value={categoryData?.name || ''}
              onChange={handleInputChange}
              disabled={id !== 'new' && edit === 'false'}
            />
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="image">Image</label>
            {!categoryData?.image ? (
              <input
                type="file"
                id="image"
                name="image"
                placeholder="Category Image"
                className="flex h-10 w-full items-center justify-start rounded-md border border-gray-400 px-2 py-2 text-base"
                onChange={handleInputChange}
                disabled={id !== 'new'}
              />
            ) : (
              <div className="flex h-10 w-full items-center justify-center rounded-md px-2 ">
                <h1 className="w-full">
                  {categoryData.image.public_id
                    ? categoryData.image.public_id
                    : productData.imageName}
                </h1>
                <button
                  onClick={handleClearImage}
                  disabled={id !== 'new'}
                  className="mx-3 flex h-full w-20 cursor-pointer items-center justify-center rounded-md border border-gray-400 outline-none hover:bg-gray-200"
                >
                  Clear
                </button>
                <div
                  onClick={() => setIsPreviewVisible(true)}
                  className="flex h-full w-20 cursor-pointer items-center justify-center rounded-md border-gray-400 bg-gray-800 text-white hover:bg-gray-700"
                >
                  View
                </div>
              </div>
            )}
            {isPreviewVisible && (
              <ImagePreview
                image={
                  categoryData.image.secure_url
                    ? categoryData.image.secure_url
                    : imagePreview
                }
                onClose={() => setIsPreviewVisible(false)}
              />
            )}
          </div>
          <div className="my-5 flex items-center justify-start gap-x-3">
            <div className="flex h-10 w-36 cursor-pointer items-center justify-center rounded-md border border-gray-400 hover:bg-gray-200">
              <Link
                to="./"
                className="flex h-full w-full items-center justify-center"
              >
                Cancel
              </Link>
            </div>
            <button
              type="submit"
              className="flex h-10 w-36 cursor-pointer items-center justify-center rounded-md border border-gray-800 bg-gray-800 text-white hover:border-gray-700 hover:bg-gray-700"
            >
              {id == 'new' ? 'Publish' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CategoryEditDetails;
