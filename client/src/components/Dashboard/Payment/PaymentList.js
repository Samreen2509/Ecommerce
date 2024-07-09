import React, { useEffect } from 'react';
import PaymentListItem from './PaymentListItem';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPayments } from '../../../features/dashboardSlice/dashPaymentSlice';
import AddButton from '../Utils/AddButton';
import { IoSettingsSharp } from 'react-icons/io5';

function PaymentList() {
  const discpatch = useDispatch();
  const { payments } = useSelector((state) => state.dashPayment);

  useEffect(() => {
    discpatch(getAllPayments());
  }, []);

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
              Failed
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
          <div className="flex h-full flex-1 cursor-pointer items-center justify-start border-r px-2 text-base font-medium hover:underline">
            Payment Id
          </div>
          <div className="flex h-full w-40 items-center justify-center border-r px-3 text-base font-medium">
            User
          </div>
          <div className="flex h-full w-32 items-center justify-center border-r px-3 text-base font-medium">
            Price
          </div>
          <div className="flex h-full w-32 items-center justify-center border-r px-3 text-base font-medium">
            status
          </div>
          <div className="flex h-full w-16 items-center justify-center border-r px-3 text-base font-medium">
            Order
          </div>
          <div className="flex h-full w-16 items-center justify-center border-r px-3 text-base font-medium">
            Url
          </div>
          <div className="flex h-full w-16 items-center justify-center px-3 text-base font-medium">
            <IoSettingsSharp />
          </div>
        </div>
        <div className="my-1 flex w-full flex-col items-center justify-center rounded-bl-md rounded-br-md border text-gray-800">
          {payments?.map((item, index) => {
            return (
              <PaymentListItem
                key={index}
                id={item?._id}
                index={index + 1}
                price={item?.price}
                userId={item?.user}
                username={item?.username}
                status={item?.status}
                url={item?.url}
                orderId={item?.orderId}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PaymentList;
