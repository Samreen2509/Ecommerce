import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';
import {
  getWishListProducts,
  removeFromWishlist,
} from '../../features/wishlistSlice';
import { useDispatch } from 'react-redux';

function WishlistProduct({ data }) {
  const quantity = 0;
  const { mainImage, price, name, _id, color } = data?.product;
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromWishlist({ _id }));
    dispatch(getWishListProducts());
  };

  if (!data) return null;

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
              ₹{price?.toFixed(0)}{' '}
            </p>
          </div>
          <div className="flex h-full w-full items-center justify-between space-x-8 ">
            {/* Wishlist Only */}

            <div className="flex w-full items-start">
              <AddToCart
                id={_id}
                quantity={quantity}
                className="flex rounded-md bg-green-400 px-2 py-1 text-white"
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
