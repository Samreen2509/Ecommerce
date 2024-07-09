import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSettingsSharp } from 'react-icons/io5';
import PaymentSettingDialog from './PaymentSettingDialog';
import { MdContentCopy } from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';
import { capitalizeFirstLetter } from '../Utils/Capitalize';
import { toast } from 'react-toastify';

function PaymentListItem({
  id,
  index,
  userId,
  username,
  status,
  price,
  url,
  orderId,
}) {
  const [isSettingDialog, setIsSettingDialog] = useState(false);

  const handleSettingClick = () => {
    setIsSettingDialog(!isSettingDialog);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {});
  };

  let statusColor;
  if (status == 'COMPLETED') {
    statusColor = 'text-green-700';
  } else if (status == 'FAILED') {
    statusColor = 'text-red-700';
  }

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
            to={`./?id=${id}&edit=false`}
          >
            {id}
          </Link>
        </div>

        <div className="flex h-full w-40 items-center justify-start border-r px-3 text-base">
          <Link
            className="flex h-full w-full items-center justify-start"
            to={`../?uid=@${userId}`}
          >
            @{username}
          </Link>
        </div>

        <div className="flex h-full w-32 items-center justify-start border-r px-3 text-base">
          Rs. {price}
        </div>

        <div
          className={`${statusColor} flex h-full w-32 items-center justify-center border-r px-3 text-base`}
        >
          {capitalizeFirstLetter(status)}
        </div>

        <div className="flex h-full w-16 cursor-pointer items-center justify-center border-r px-3 text-base">
          <Link
            to={`../order/?id=${orderId}&edit=false`}
            className="flex h-full w-full items-center justify-center"
          >
            <FiExternalLink />
          </Link>
        </div>

        <div className="flex h-full w-16 cursor-pointer items-center justify-center border-r px-3 text-base">
          <MdContentCopy onClick={copyToClipboard(url)} />
        </div>

        <div
          onClick={handleSettingClick}
          className="flex h-full w-16 cursor-pointer items-center justify-center px-3 text-base"
        >
          <IoSettingsSharp />
        </div>
      </div>

      {isSettingDialog && (
        <PaymentSettingDialog
          userId={userId}
          paymentId={id}
          status={status}
          onClose={() => setIsSettingDialog(false)}
        />
      )}
    </>
  );
}

export default PaymentListItem;
