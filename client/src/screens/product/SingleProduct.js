import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProduct } from '../../features/productSlice';
import { FaRupeeSign } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import AddToBag from '../BAG/AddToBag';
import WishlistBtn from '../BAG/WishlistBtn';
import ProductDescriptionRender from '../../utils/ProductDescriptionRender';

function SingleProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const displayProductSize = ['XS', 'S', 'M', 'L', 'X', 'XL'];
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(-1);
  const { singleProduct } = useSelector((state) => state.product);
  const { isUserLogin } = useSelector((state) => state.auth);
  const [displayImage, setDisplayImage] = useState(null);

  useEffect(() => {
    if (productId) {
      dispatch(getOneProduct({ productId }));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (singleProduct) {
      setDisplayImage(singleProduct?.mainImage?.url);
    }
  }, [singleProduct]);

  const checkSize = (siz) => {
    setSelectedSize(siz);
  };

  const handleSideImageClick = (index) => {
    setSelectedImage(index);
    if (index === -1) {
      setDisplayImage(singleProduct?.mainImage?.url);
    } else {
      setDisplayImage(singleProduct?.otherImages[index]?.url);
    }
  };

  return (
    <div className="mb-10 mt-5 grid w-full items-start justify-between overflow-x-auto px-1 md:px-5 lg:flex lg:gap-x-10">
      {/* Image section */}
      <div className="flex h-auto w-full flex-col-reverse justify-center gap-5 lg:w-1/2 lg:flex-row">
        <div className="flex items-center gap-x-5 gap-y-5 lg:mt-2 lg:flex-col ">
          <div
            onClick={() => handleSideImageClick(-1)}
            className={`cursor-pointer rounded-md border-2 ${selectedImage === -1 ? 'border-blue-900' : ''}`}
          >
            <img
              className="h-24 w-16 rounded-md"
              src={singleProduct?.mainImage?.url}
              alt="image"
            />
          </div>
          {singleProduct?.otherImages &&
            singleProduct?.otherImages.map((img, index) => (
              <div
                key={index}
                onClick={() => handleSideImageClick(index)}
                className={`cursor-pointer rounded-md border-2 ${selectedImage === index ? 'border-blue-900' : ''}`}
              >
                <img
                  className="h-24 w-16 rounded-md"
                  src={img?.url}
                  alt="image"
                />
              </div>
            ))}
        </div>
        {/* Main Image */}
        <div className="mt-2 flex h-[80vh] cursor-pointer items-center justify-center rounded-md bg-gray-200 md:h-96 lg:h-[85vh]">
          {displayImage && (
            <img
              className="h-full w-full rounded-md object-contain"
              src={displayImage}
              alt="image"
            />
          )}
        </div>
      </div>

      {/* Content section */}
      <div className="mt-2 grid h-auto w-full items-center justify-start gap-4 lg:w-1/2">
        {/* Name and description */}
        <div className="grid items-start justify-start gap-1">
          <h3 className="text-lg font-bold text-gray-700">
            {singleProduct?.name}
          </h3>
          <h4 className="text-base text-gray-400">
            <ProductDescriptionRender
              description={singleProduct?.description}
            />
          </h4>
        </div>

        <div className="grid items-center justify-start gap-2">
          {/* Rating */}
          <div className="flex items-center justify-start gap-1">
            <span className="border-black-800 flex items-center justify-center gap-1 rounded-md border-solid border-black bg-slate-200">
              <FaStar className="text-orange-300" />
              <span className="pt-1">4.8</span>
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1">
            <FaRupeeSign />
            <span className="text-lg">{singleProduct?.price}</span>
            <s className="text-gray-400">4000</s>
            <span className="text-lg text-green-400">50% OFF</span>
          </div>
          <span className="text-xs text-gray-400">inclusive of all taxes</span>

          {/* Cloth Details */}
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-gray-500 px-3 py-1 text-xs text-white">
              OVERSIZED FIT
            </span>
            <span className="rounded-sm border-solid border-black bg-slate-300 px-3 py-1 text-sm font-bold">
              100% COTTON
            </span>
          </div>

          {/* Member Discount */}
          <div>
            <hr className="mt-2 w-11/12 bg-gray-100" />
            <p className="mt-2 text-sm">
              members get an extra discount of ₹30 and FREE shipping.
              <span className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Learn more
              </span>
            </p>
          </div>

          {/* Sizes */}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="flex flex-wrap justify-start gap-2">
              {displayProductSize.map((ele, index) => {
                const isAvailable = singleProduct?.size.includes(ele);
                return (
                  <span
                    key={index}
                    title={!isAvailable ? 'Not Available' : ''}
                    onClick={() => isAvailable && checkSize(ele)}
                    className={`cursor-pointer rounded-md border-2 border-solid px-4 py-2 text-center text-sm ${isAvailable && selectedSize === ele ? 'bg-orange-600 text-white' : ''} ${!isAvailable ? 'bg-gray-200' : ''}`}
                  >
                    {ele}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Add to Bag and Wishlist */}
          <div className="mt-4 flex w-full items-center justify-between">
            <AddToBag
              className={`flex-1 ${!selectedSize ? 'cursor-not-allowed bg-opacity-70' : 'hover:bg-blue-900'}`}
              productId={productId}
              quantity={1}
              size={selectedSize}
            />
            <WishlistBtn
              id={productId}
              mode="normal"
              isUserLogin={isUserLogin}
            />
          </div>

          {/* Key Highlights */}
          <div className="mt-6">
            <h3 className="mb-3 text-lg font-bold">Key Highlights</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h5 className="text-sm text-gray-400">Design</h5>
                <span className="font-bold">Graphic Print</span>
              </div>
              <div>
                <h5 className="text-sm text-gray-400">Fit</h5>
                <span className="font-bold">Oversized Fit</span>
              </div>
              <div>
                <h5 className="text-sm text-gray-400">Neck</h5>
                <span className="font-bold">Round Neck</span>
              </div>
              <div>
                <h5 className="text-sm text-gray-400">Occasion</h5>
                <span className="font-bold">Casual</span>
              </div>
              <div>
                <h5 className="text-sm text-gray-400">Sleeve Style</h5>
                <span className="font-bold">Half Sleeve</span>
              </div>
              <div>
                <h5 className="text-sm text-gray-400">Wash Care</h5>
                <span className="font-bold">Machine wash as per tag</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
