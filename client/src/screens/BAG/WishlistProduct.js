import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import AddToBag from './AddToBag';
import {
  getWishListProducts,
  removeFromWishlist,
} from '../../features/wishlistSlice';
import { useDispatch } from 'react-redux';

function WishlistProduct({ mainImage, price, name, _id, color }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleRemove = () => {
    dispatch(removeFromWishlist({ id: _id }));
    dispatch(getWishListProducts());
  };

  const handleSelectChange = (e) => {
    e.preventDefault();
    setQuantity(Number(e.target.value));
  };

  return (
    <div className="mt-4 flex w-full flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8">
      <Link
        to={`/singleProduct/${_id}`}
        className="w-full pb-4 md:w-40 md:pb-8"
      >
        <img
          className="hidden w-full md:block"
          draggable="false"
          src={mainImage?.url}
          alt="dress"
        />
        <img className="w-full md:hidden" src={mainImage?.url} alt="dress" />
      </Link>
      <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-8 md:flex-row md:space-y-0">
        <Link
          to={`/singleProduct/${_id}`}
          className="flex w-full flex-col items-start justify-start space-y-8"
        >
          <h3 className="text-xl font-semibold leading-6 text-gray-800 xl:text-2xl">
            {name}
          </h3>
          <div className="flex flex-col items-start justify-start space-y-2">
            <p className="text-sm leading-none text-gray-700">
              <span className="text-black">Color: </span> {color}
            </p>
            <p className="text-sm leading-none text-gray-800">
              <span className="text-black">Style: </span> Italic Minimal Design
            </p>
          </div>
        </Link>

        <div className="flex w-full flex-col justify-between gap-y-10 ">
          <div className="flex w-full items-start justify-between space-x-8">
            <p className="text-base leading-6 xl:text-lg ">
              ₹{price?.toFixed(0)}{' '}
              <span className="text-red-300 line-through"> ₹{price + 100}</span>
            </p>
            <p className="text-base leading-6 text-gray-800 xl:text-lg ">
              {quantity}
            </p>
            <p className="text-base font-semibold leading-6 text-gray-800 xl:text-lg ">
              ₹{price?.toFixed(0) * quantity}{' '}
            </p>
          </div>
          <div className="flex h-full w-full items-center justify-between space-x-8 ">
            {/* Wishlist Only */}
            <div className="flex items-start justify-between gap-2">
              <select
                id="quantity"
                value={quantity}
                onChange={handleSelectChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="" disabled>
                  Choose Quantity
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="flex w-full items-center">
              <AddToBag
                id={_id}
                quantity={quantity}
                productId={_id}
                wishlistBtn={true}
                className="flex rounded-md px-2 py-1 text-white"
              />
            </div>

            <div className="flex w-full items-end justify-end">
              <RxCross2
                className="cursor-pointer rounded-full p-1 hover:bg-slate-300"
                size={28}
                onClick={handleRemove}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistProduct;
