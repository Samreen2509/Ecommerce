import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProduct } from '../../features/productSlice';
import ProductSlider from './ProductSlider';
import { FaRupeeSign } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import AddToCart from '../BAG/AddToCart';
import img1 from '../../../images/Nasa-t-shirt1.webp';
import img2 from '../../../images/Nasa-t-shirt2.webp';
import img3 from '../../../images/Nasa-t-shirt3.webp';
import img4 from '../../../images/Nasa-t-shirt4.webp';
import WishlistBtn from '../BAG/WishlistBtn';

function SingleProduct() {
  const image = [img1, img2, img3, img4];
  const { productId } = useParams();
  const dispatch = useDispatch();
  const displayProductSize = ['XS', 'S', 'M', 'L', 'X', 'XL'];
  const [selectedSize, setSelectedSize] = useState(null);
  useEffect(() => {
    dispatch(getOneProduct({ id: productId }));
  }, []);
  const oneProduct = useSelector((state) => state.product.product);

  const checkSize = (siz) => {
    setSelectedSize(siz);
  };

  console.log(oneProduct);
  return (
    <div className=" mb-10 grid w-full items-start justify-center lg:flex">
      {/* image section */}
      <div className=" flex h-auto w-full flex-col-reverse justify-center gap-5  lg:w-1/2 lg:flex-row">
        {/* Others Image */}
        <div className="flex  items-center  lg:flex-col ">
          {image &&
            image.map((img) => (
              <div className=" px-2 py-2">
                <img className="h-28 w-28" src={img} alt="image" />
              </div>
            ))}
        </div>
        {/* Main Image */}
        <div className="h-1/2  pt-2">
          {oneProduct && (
            <div>
              <img
                className="h-full w-full"
                src={oneProduct.data.productInfo.mainImage.url}
                alt="image"
              />
            </div>
          )}
        </div>
      </div>
      {/* content section */}
      <div className="mt-2 grid h-auto w-1/2 items-center justify-start gap-1">
        {/* name and description */}
        <div className="grid items-center justify-start gap-1">
          <h3 className="text-lg font-bold text-gray-700">
            {oneProduct && oneProduct.data.productInfo.name}
          </h3>
          <h4 className="text-lg text-gray-400">
            {oneProduct && oneProduct.data.productInfo.description}
          </h4>
        </div>

        <div className="grid items-center justify-start gap-2">
          {/* rating */}
          <p className="border-black-800 flex w-16 items-center justify-center gap-1 rounded-md border-solid border-black bg-slate-200">
            <FaStar className=" text-orange-300" />
            <span className="pt-1">4.8</span>
          </p>

          {/* Price */}
          <div>
            <p className="flex items-center gap-1">
              <FaRupeeSign />
              <span className=" mr-1 text-lg">
                {oneProduct && oneProduct.data.productInfo.price}
              </span>
              <s className="text-gray-400">4000</s>
              <span className=" ml-1 text-lg text-green-400">50% OFF</span>
            </p>
            <span className="text-xs text-gray-400">
              inclusive of all taxes
            </span>
          </div>

          {/* cloth Deatials */}
          <div className="flex items-center gap-5">
            <span className=" rounded-md bg-gray-500 px-3 py-1 text-xs text-white">
              OVERSIZED FIT
            </span>
            <span className="rounded-sm border-solid border-black bg-slate-300 px-3 py-1  text-sm font-bold">
              100% COTTON
            </span>
          </div>

          {/* Member Discount */}
          <div>
            <hr className=" w-11/12 bg-gray-100 pt-0.5" />
            <p className="mt-2 text-sm">
              members get an extra discount of ₹30 and FREE shipping.
              <span className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Learn more
              </span>
            </p>
          </div>

          {/* Sizes */}
          <div className="mt-10">
            <div className="flex flex-col justify-start gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Size guide
                </a>
              </div>
              <div className="flex items-center justify-center gap-4 text-black">
                {displayProductSize.map((ele) => {
                  const isAvailable =
                    oneProduct?.data.productInfo.size.includes(ele);
                  return (
                    <span
                      key={ele}
                      onClick={() => isAvailable && checkSize(ele)}
                      className={` cursor-pointer rounded-md border-2 border-solid px-5 py-3 text-center text-sm ${
                        isAvailable && selectedSize === ele
                          ? ' bg-orange-600 text-white'
                          : ''
                      } ${!isAvailable ? 'bg-gray-300' : ''}`}
                    >
                      {ele}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Add to Bag and Wishlist */}
          <div className="items-cente flex w-full bg-gray-100 px-4 py-2">
            <AddToCart className="w-1/2  hover:bg-orange-600" />
            {/* <WishlistBtn /> */}
          </div>

          {/* Key Highlights */}
          <div className="mt-8">
            <h3 className="mb-3 text-lg font-bold">Key Highlights</h3>
            <div className="ml-3 flex items-center justify-between">
              <div className="items-cente grid justify-start gap-7">
                <div className="">
                  <h5 className="text-sm text-gray-400">Design</h5>
                  <span className=" font-bold">Graphic Print</span>
                </div>
                <div className="grid items-start">
                  <h5 className="text-sm text-gray-400">Fit</h5>
                  <span className=" font-bold">Oversized Fit</span>
                </div>
                <div>
                  <h5 className="text-sm text-gray-400">Neck</h5>
                  <span className=" font-bold">Round Neck</span>
                </div>
              </div>
              <div className="items-cente grid justify-start gap-7">
                <div>
                  <h5 className="text-sm text-gray-400">Occasion</h5>
                  <span className=" font-bold">Casual</span>
                </div>
                <div>
                  <h5 className="text-sm text-gray-400">Sleeve Style</h5>
                  <span className=" font-bold">Half Sleeve</span>
                </div>
                <div>
                  <h5 className="text-sm text-gray-400">Wash Care</h5>
                  <span className=" font-bold">Machine wash as per tag</span>
                </div>
              </div>

              {/* <div className="flex items-start justify-start gap-56"> 
                
              </div>
              <div className="flex items-start justify-start gap-56">
                
                
              </div>
              <div className="flex items-start justify-start gap-56">
                
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
