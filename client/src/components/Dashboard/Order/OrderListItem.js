import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSettingsSharp } from 'react-icons/io5';
import OrderSettingDialog from './OrderSettingDialog';
import { capitalizeFirstLetter } from '../Utils/Capitalize';

function OrderListItem({ id, index, status, payment }) {
  const [isSettingDialog, setIsSeetingDialog] = useState(false);

  const handleSettingClick = () => {
    setIsSeetingDialog(!isSettingDialog);
  };

  return (
    <>
      <div className="flex h-12 w-full items-center justify-center border-b text-gray-800">
        <div className="flex h-full w-10 items-center justify-center border-r px-3">
          <input className="cursor-pointer" type="checkbox" />
        </div>

        <div className="flex h-full w-16 items-center justify-center border-r px-3 text-base font-medium">
          {index}
        </div>

        <div className="flex h-full flex-1 cursor-pointer items-center justify-start border-r px-2 text-base hover:underline">
          <Link
            className="flex h-full w-full items-center justify-start"
            to={`./?id=${id}`}
          >
            {id}
          </Link>
        </div>

        <div className="flex h-full w-36 items-center justify-center border-r px-3 text-base">
          {capitalizeFirstLetter(status)}
        </div>

        <div className="flex h-full w-36 items-center justify-center border-r px-3 text-base">
          Rs. {payment?.price}
        </div>

        <div className="flex h-full w-36 items-center justify-center border-r px-3 text-base">
          {capitalizeFirstLetter(payment?.status)}
        </div>

        <div
          onClick={handleSettingClick}
          className="flex w-36 cursor-pointer items-center justify-center px-3 text-base"
        >
          <IoSettingsSharp />
        </div>
      </div>

      {isSettingDialog && <OrderSettingDialog id={id} status={status} />}
    </>
  );
}

export default OrderListItem;
