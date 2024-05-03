import React from 'react';

function BagProduct() {
  return (
    <div className="mt-4 flex w-full flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8">
      <div className="w-full pb-4 md:w-40 md:pb-8">
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
      </div>
      <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-8 md:flex-row md:space-y-0">
        <div className="flex w-full flex-col items-start justify-start space-y-8">
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
        </div>
        <div className="flex w-full items-start justify-between space-x-8">
          <p className="text-base leading-6 xl:text-lg ">
            ₹36.00 <span className="text-red-300 line-through"> ₹45.00</span>
          </p>
          <p className="text-base leading-6 text-gray-800 xl:text-lg ">01</p>
          <p className="text-base font-semibold leading-6 text-gray-800 xl:text-lg ">
            ₹36.00
          </p>
        </div>
      </div>
    </div>
  );
}

export default BagProduct;
