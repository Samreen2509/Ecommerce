import React, { useEffect, useState } from 'react';
import OrderListItem from './OrderListItem';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../../features/orderSlice';
import Pagination from '../../../screens/product/Pagination';

function OrderList() {
  const dispatch = useDispatch();
  const { allOrders, SuccessMsg } = useSelector((state) => state.order);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllOrders({ page }));
  }, [dispatch, page, SuccessMsg]);

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
        </div>
        <div className="flex h-12 w-full items-center justify-center rounded-tl-md rounded-tr-md bg-gray-800 text-white">
          <div className="flex h-full w-10 items-center justify-center border-r px-3">
            <input className="cursor-pointer" type="checkbox" />
          </div>
          <div className="flex h-full w-16 items-center justify-center border-r px-3 text-base font-medium">
            S.No
          </div>
          <div className="flex h-full flex-1 cursor-pointer items-center justify-start border-r px-2 text-base font-medium hover:underline">
            Order Id
          </div>
          <div className="flex h-full w-36 items-center justify-center border-r px-3 text-base font-medium">
            Status
          </div>
          <div className="flex h-full w-36 items-center justify-center border-r px-3 text-base font-medium">
            Price
          </div>
          <div className="flex h-full w-36 items-center justify-center border-r px-3 text-base font-medium">
            Payment
          </div>
          <div className="flex h-full w-36 items-center justify-center px-3 text-base font-medium">
            Setting
          </div>
        </div>
        <div className="my-1 flex w-full flex-col items-center justify-center rounded-bl-md rounded-br-md border text-gray-800">
          {allOrders.map((item, index) => {
            return (
              <OrderListItem
                key={index}
                id={item._id}
                index={page == 1 ? index + 1 : (page - 1) * 12 + (index + 1)}
                status={item?.status}
                payment={item?.payment}
                user={item?.customer}
              />
            );
          })}
        </div>
        <div className="my-5 flex w-full items-center px-5">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(allOrders?.length >= 12 ? page + 1 : page)}
            onPageChange={setPage}
            style={{
              position: 'justify-end',
              color: 'bg-gray-800',
            }}
          />
        </div>
      </div>
    </>
  );
}

export default OrderList;
