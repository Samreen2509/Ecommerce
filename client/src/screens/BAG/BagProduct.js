import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { updateToCart, removeFromCart } from '../../features/cartSlice';
import { useDispatch } from 'react-redux';

function BagProduct({
  mainImage,
  price,
  name,
  _id,
  colorName,
  colorHex,
  preQuantity,
  size,
}) {
  const [quantity, setQuantity] = useState(preQuantity);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(preQuantity);
  }, [preQuantity]);

  const handleQuantityInputChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    dispatch(updateToCart({ productId, quantity, size }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart({ _id }));
  };

  return (
    <div className="mt-4 flex w-full flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8">
      <Link
        to={`/singleProduct/${_id}`}
        className="w-full pb-4 md:w-40 md:pb-8"
      >
        <img
          className="hidden w-full rounded-md md:block"
          draggable="false"
          src={mainImage?.url}
          alt="product"
        />
      </Link>
      <div className="flex w-full flex-col items-start justify-between space-y-4 pb-8 md:flex-row md:space-y-0">
        <Link
          to={`/singleProduct/${_id}`}
          className="flex w-full flex-col items-start justify-start space-y-8"
        >
          <h3 className="text-xl font-semibold capitalize leading-6 text-gray-800 xl:text-2xl">
            {name}
          </h3>
          <div className="flex flex-col items-start justify-start space-y-2">
            <p className="my-2 flex items-center justify-start text-sm leading-none text-gray-700">
              <span className="text-black">Color: </span> {colorName}{' '}
              <div
                style={{ backgroundColor: colorHex }}
                className="mx-5 h-5 w-6 rounded-md"
              ></div>
            </p>
            <p className="text-sm leading-none text-gray-800">
              <span className="text-black">Style: </span> Italic Minimal Design
            </p>
          </div>
        </Link>

        <div className="ml-10 flex w-full flex-col justify-between gap-y-10">
          <div className=" flex w-full items-start justify-between space-x-8">
            <p className="flex flex-col items-center justify-center text-base leading-6 text-gray-800 xl:text-lg">
              <span className="text-sm">Size</span>
              {size}
            </p>
            <p className="flex flex-col items-center justify-center text-base leading-6 xl:text-lg">
              <span className="text-sm">Price</span>₹{price?.toFixed(0)}
            </p>
            <p className="flex flex-col items-center justify-center text-base font-semibold leading-6 text-gray-800 xl:text-lg">
              <span className="text-sm font-normal">Total</span>₹
              {quantity * price?.toFixed(0)}
            </p>
          </div>
          <div className="flex h-full w-full items-center justify-between space-x-8">
            <div className="flex h-11 items-center justify-center">
              <div
                onClick={() => {
                  setQuantity(quantity - 1);
                }}
                className="flex h-full w-11 cursor-pointer items-center justify-center rounded-bl-md rounded-tl-md bg-primary text-xl font-semibold text-white transition duration-200 ease-in-out hover:bg-primary-light"
              >
                -
              </div>
              <input
                type="text"
                name="quantityInput"
                value={quantity}
                onChange={handleQuantityInputChange}
                className="flex h-full w-12 items-center justify-center border-y px-2 text-center outline-none"
              />
              <div
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
                className="flex h-full w-11 cursor-pointer items-center justify-center rounded-br-md rounded-tr-md bg-primary text-xl font-semibold text-white transition duration-200 ease-in-out hover:bg-primary-light"
              >
                +
              </div>
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

export default BagProduct;
