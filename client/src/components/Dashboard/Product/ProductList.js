import React, { useEffect } from 'react';
import ProductListItem from './ProductListItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../features/dashboardSlice';
import AddButton from '../Utils/AddButton';

function ProductList() {
  const discpatch = useDispatch();
  const { products, SuccessMsg } = useSelector((state) => state.dashboard);

  useEffect(() => {
    discpatch(getProducts());
  }, [SuccessMsg]);

  return (
    <>
      <div className="w-full">
        <div className="my-2 flex w-full items-center justify-start">
          <ul className="flex w-full items-center justify-start gap-x-2">
            <li className="flex h-10 cursor-pointer items-center justify-center rounded-md border border-gray-800 bg-gray-800 px-4 text-white hover:bg-gray-700">
              All
            </li>
            <li className="flex h-10 cursor-pointer items-center justify-center rounded-md border px-4 text-gray-700 hover:bg-gray-200">
              Pending
            </li>
            <li className="flex h-10 cursor-pointer items-center justify-center rounded-md border px-4 text-gray-700 hover:bg-gray-200">
              Completed
            </li>
            <li className="flex h-10 cursor-pointer items-center justify-center rounded-md border px-4 text-gray-700 hover:bg-gray-200">
              Canceled
            </li>
          </ul>
          <AddButton />
        </div>
        <div className="flex h-12 w-full items-center justify-center rounded-tl-md rounded-tr-md bg-gray-800 text-white">
          <div className="flex h-full w-10 items-center justify-center border-r px-3">
            <input className="cursor-pointer" type="checkbox" />
          </div>
          <div className="flex h-full w-16 items-center justify-center border-r px-3 text-base font-medium">
            S.No
          </div>
          <div className="flex h-full w-full cursor-pointer items-center justify-start border-r px-2 text-base font-medium hover:underline">
            Name
          </div>
          <div className="flex h-full w-36 items-center justify-center border-r px-3 text-base font-medium">
            Stock
          </div>
          <div className="flex h-full w-36 items-center justify-center border-r px-3 text-base font-medium">
            Price
          </div>
          <div className="flex h-full w-36 items-center justify-center border-r px-3 text-base font-medium">
            Edit
          </div>
          <div className="flex h-full w-36 items-center justify-center px-3 text-base font-medium">
            Setting
          </div>
          <div className="flex h-full w-36 items-center justify-center px-3 text-base font-medium">
            Delete
          </div>
        </div>
        <div className="my-1 flex w-full flex-col items-center justify-center rounded-bl-md rounded-br-md border text-gray-800">
          {products?.map((item, index) => {
            return (
              <ProductListItem
                key={index}
                id={item._id}
                index={index + 1}
                name={item.name}
                stock={item.stock}
                price={item.price}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ProductList;
