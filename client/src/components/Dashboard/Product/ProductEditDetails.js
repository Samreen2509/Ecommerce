import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImagePreview from '../Utils/ImagePreview';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategory,
  getColors,
  updateProduct,
} from '../../../features/dashboardSlice';
import { toast } from 'react-toastify';

function ProductEditDetails({ id, edit }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    size: '',
    price: '',
    stock: '',
    mainImage: null,
    mainImageName: '',
    category: '',
    color: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const { categories, colors, SuccessMsg, error } = useSelector(
    (state) => state.dashboard
  );
  const BASE_URL = process.env.BASEURL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== 'new') {
      const fetchProductData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/product/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          });
          return response.data.data.productInfo;
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };

      dispatch(getCategory());
      dispatch(getColors());

      const fetchData = async () => {
        if (id !== 'new' && edit) {
          const productData = await fetchProductData();
          if (productData) {
            setProductData({
              name: productData.name,
              description: productData.description,
              size: productData.size,
              price: productData.price,
              stock: productData.stock,
              mainImage: productData.mainImage,
              mainImageName: productData.mainImage?.public_id,
              category: productData.category,
              color: productData.color,
            });
          }
        }
      };

      fetchData();
    }
  }, [id, edit, dispatch]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'mainImage' && files && files.length > 0) {
      const file = files[0];
      setProductData((prevData) => ({
        ...prevData,
        mainImage: file,
        mainImageName: file.name,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(productData);

    if (id != 'new' && edit != 'true') {
      navigate(`./?id=${id}&edit=true`);
    }

    if (id == 'new' && edit != 'true') {
      // navigate('./');
    }

    if (id != 'new' && edit == 'true') {
      dispatch(updateProduct({ productData, id }));
      if (SuccessMsg !== null) {
        toast.success(SuccessMsg);
        navigate('./');
      }
      toast.error(error);
    }

    if (id == 'new' && edit == 'true') {
      addProduct(productData);
      // navigate('./');
    }
  };

  const handleClearImage = () => {
    setProductData((prevData) => ({
      ...prevData,
      mainImage: null,
      mainImageName: '',
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
              placeholder="Product Name"
              className="h-10 rounded-md border border-gray-400 px-2 py-2 text-base"
              value={productData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              rows={10}
              type="text"
              id="description"
              name="description"
              placeholder="Product Description"
              className="rounded-md border border-gray-400 px-2 py-2 text-base"
              value={productData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="size">Size - ("S M L XL XXL" Not use Commas)</label>
            <input
              type="text"
              id="size"
              name="size"
              placeholder="Product Size"
              className="h-10 rounded-md border border-gray-400 px-2 py-2 text-base"
              value={productData.size}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-center gap-x-5">
            <div className="flex w-full flex-col">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Product Price"
                className="h-10 rounded-md border border-gray-400 px-2 py-2 text-base"
                value={productData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col ">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                name="stock"
                placeholder="Product Stock"
                className="h-10 rounded-md border border-gray-400 px-2 py-2 text-base"
                value={productData.stock}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="mainImage">Main Image</label>
            {!productData.mainImage ? (
              <input
                type="file"
                id="mainImage"
                name="mainImage"
                placeholder="Product Main Image"
                className="flex h-10 w-full items-center justify-start rounded-md border border-gray-400 px-2 py-2 text-base"
                onChange={handleInputChange}
              />
            ) : (
              <div className="flex h-10 w-full items-center justify-center rounded-md px-2 ">
                <h1 className="w-full">{productData.mainImageName}</h1>
                <div
                  onClick={handleClearImage}
                  className="mx-3 flex h-full w-20 cursor-pointer items-center justify-center rounded-md border border-gray-400 hover:bg-gray-200"
                >
                  Clear
                </div>
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
                image={imagePreview}
                onClose={() => setIsPreviewVisible(false)}
              />
            )}
          </div>
          <div className="flex items-center justify-center gap-x-3">
            <div className="flex w-1/2 flex-col">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                className="h-10 rounded-md border border-gray-400 bg-transparent px-2 py-2 text-base"
                value={productData.category}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select
                </option>
                {categories &&
                  categories.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex w-1/2 flex-col">
              <label htmlFor="color">Color</label>
              <select
                id="color"
                name="color"
                className="h-10 rounded-md border border-gray-400 bg-transparent px-2 py-2 text-base"
                value={productData.color}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select color
                </option>
                {colors &&
                  colors.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
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
              {edit ? 'Publish' : 'Edit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProductEditDetails;
