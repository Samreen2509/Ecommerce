import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImagePreview from '../Utils/ImagePreview';

function ProductEditDetails({ id, edit }) {
  const [categories, setCategrories] = useState([]);
  const [colors, setColors] = useState([]);
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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = () => {
      // fetch product data and return
    };

    const fetchCategoriesData = () => {
      // fetch categories and return
    };

    const fetchColorsData = () => {
      // fetch colors and return
    };

    if (id != 'new' && edit) {
      setProductData(fetchProductData);
    }

    setCategrories(fetchCategoriesData);
    setColors(fetchColorsData);
  }, [id, edit]);

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

  console.log(productData);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(productData);
    const addProduct = (productData) => {
      // addProduct api call and .. add product
    };

    const updateProduct = (productData) => {
      // update Product api .. call and update product data
      // you can use id variable
    };

    if (id != 'new' && edit != 'true') {
      navigate(`./?id=${id}&edit=true`);
    }

    if (id == 'new' && edit != 'true') {
      navigate('./');
    }

    if (id != 'new' && edit == 'true') {
      updateProduct(productData);
      navigate('./');
    }

    if (id == 'new' && edit == 'true') {
      addProduct(productData);
      navigate('./');
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
              value={productData?.name || ''}
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
              value={productData?.description || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="size">Size</label>
            <input
              type="text"
              id="size"
              name="size"
              placeholder="Product Size"
              className="h-10 rounded-md border border-gray-400 px-2 py-2 text-base"
              value={productData?.size || ''}
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
                value={productData?.price || ''}
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
                value={productData?.stock || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="mainImage">Main Image</label>
            {!productData?.mainImage ? (
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
                <h1 className="w-full">{productData?.mainImageName}</h1>
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
                value={productData?.category || ''}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  select
                </option>
                {categories?.map((item, index) => {
                  return (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex w-1/2 flex-col">
              <label htmlFor="color">Color</label>
              <select
                id="color"
                name="color"
                className="h-10 rounded-md border border-gray-400 bg-transparent px-2 py-2 text-base"
                value={productData?.color || ''}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  select color
                </option>
                {colors?.map((item, index) => {
                  return (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
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
              {edit == 'true' ? 'Publish' : 'Edit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProductEditDetails;
