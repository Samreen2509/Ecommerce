import React, { useCallback, useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus, FaTruckLoading } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { updateToCart, removeFromCart } from '../../features/cartSlice';
import { useDispatch } from 'react-redux';
import { debounce } from '../../components/debounce';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function BagProduct({ data, isLoading }) {
  const [quantity, setQuantity] = useState(data.quantity);

  const dispatch = useDispatch();
  const { mainImage, price, name, _id, color } = data.product;
  console.log(isLoading);

  useEffect(() => {
    setQuantity(data.quantity); // Update the quantity when data changes
  }, [data]);

  const updateCartQuantity = useCallback(
    debounce((productId, newQuantity) => {
      dispatch(updateToCart({ productId, quantity: newQuantity }));
    }, 2000),
    [dispatch]
  );

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 0) return;
    setQuantity(newQuantity);
    updateCartQuantity(_id, newQuantity);
  };

  const handleSelectChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    handleQuantityChange(newQuantity);
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
          className="hidden w-full md:block"
          draggable="false"
          src={mainImage?.url}
          alt="product"
        />
        <img className="w-full md:hidden" src={mainImage?.url} alt="product" />
      </Link>
      <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-8 md:flex-row md:space-y-0">
        <Link
          to={`/singleProduct/${_id}`}
          className="flex w-full flex-col items-start justify-start space-y-8"
        >
          <h3 className="text-xl font-semibold capitalize leading-6 text-gray-800 xl:text-2xl">
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

        <div className="flex w-full flex-col justify-between gap-y-10">
          <div className="flex w-full items-start justify-between space-x-8">
            <p className="text-base leading-6 xl:text-lg">
              ₹{price?.toFixed(0)}{' '}
              <span className="text-red-300 line-through"> ₹{price + 100}</span>
            </p>
            <p className="text-base leading-6 text-gray-800 xl:text-lg">
              {quantity}
            </p>
            <p className="text-base font-semibold leading-6 text-gray-800 xl:text-lg">
              ₹{quantity * price?.toFixed(0)}
            </p>
          </div>
          <div className="flex h-full w-full items-center justify-between space-x-8">
            <div className="flex items-start justify-between gap-2">
              <label
                htmlFor="countries"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Choose Quantity
              </label>
              <select
                id="countries"
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
              {isLoading && (
                <AiOutlineLoading3Quarters size={40} className="animate-spin" />
              )}
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
