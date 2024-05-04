import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function BagProduct({ cart }) {
  const [Qunatity, setQunatity] = useState(0);

  return (
    <div className="mt-4 flex w-full flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8">
      <Link to={'/singleProduct'} className="w-full pb-4 md:w-40 md:pb-8">
        <img
          className="hidden w-full md:block"
          src="https://miona-vinovatheme.myshopify.com/cdn/shop/files/img-1-6_900x.jpg?v=1687334630"
          alt="dress"
        />
        <img
          className="w-full md:hidden"
          src="https://miona-vinovatheme.myshopify.com/cdn/shop/files/img-1-6_900x.jpg?v=1687334630"
          alt="dress"
        />
      </Link>
      <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-8 md:flex-row md:space-y-0">
        <Link
          to={'/singleProduct'}
          className="flex w-full flex-col items-start justify-start space-y-8"
        >
          <h3 className="text-xl font-semibold leading-6 text-gray-800 xl:text-2xl">
            Premium Quaility Dress
          </h3>
          <div className="flex flex-col items-start justify-start space-y-2">
            <p className="text-sm leading-none text-gray-700">
              <span className="text-black">Style: </span> Italic Minimal Design
            </p>
            <p className="text-sm leading-none text-gray-800">
              <span className="text-black">Style: </span> Italic Minimal Design
            </p>
            <p className="text-sm leading-none text-gray-800">
              <span className="text-black">Style: </span> Italic Minimal Design
            </p>
          </div>
        </Link>

        <div className="flex w-full flex-col justify-between gap-y-10 ">
          <div className="flex w-full items-start justify-between space-x-8">
            <p className="text-base leading-6 xl:text-lg ">
              ₹36.00 <span className="text-red-300 line-through"> ₹45.00</span>
            </p>
            <p className="text-base leading-6 text-gray-800 xl:text-lg ">
              {Qunatity}
            </p>
            <p className="text-base font-semibold leading-6 text-gray-800 xl:text-lg ">
              ₹39.00
            </p>
          </div>
          <div className="flex h-full w-full items-center justify-between space-x-8 ">
            {/* If Cart is true then show this Qunatity component */}
            {cart && (
              <div className="flex items-start justify-between">
                <div className="flex h-8 w-full items-center gap-x-4 border-2 border-gray-400">
                  <FaMinus
                    onClick={() => setQunatity(Qunatity > 0 ? Qunatity - 1 : 0)}
                    size={15}
                    className="mx-2 h-full cursor-pointer hover:text-orange-400"
                  />
                  <span className="select-none">{Qunatity}</span>
                  <FaPlus
                    onClick={() => setQunatity(Qunatity + 1)}
                    size={15}
                    className="mx-2 h-full cursor-pointer  hover:text-orange-400"
                  />
                </div>
              </div>
            )}
            <div className="flex w-full items-end justify-end">
              <RxCross2
                className="cursor-pointer hover:text-orange-400"
                size={28}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BagProduct;
