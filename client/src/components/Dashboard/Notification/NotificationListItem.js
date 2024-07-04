import React, { useState } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import NotificationSettingDialog from './NotificationSettingDialog';

function NotificationListItem({ id, index, notification }) {
  const [isSettingDialog, setIsSettingDialog] = useState(false);

  const handleSettingClick = () => {
    setIsSettingDialog(!isSettingDialog);
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

        <div className="flex h-full w-full cursor-pointer items-center justify-start border-r px-2 text-base hover:underline">
          {notification}
        </div>
        <div
          onClick={handleSettingClick}
          className="flex h-full w-36 cursor-pointer items-center justify-center px-3 text-base"
        >
          <IoSettingsSharp />
        </div>
      </div>

      {isSettingDialog && (
        <NotificationSettingDialog
          id={id}
          title={notification}
          onClose={() => setIsSettingDialog(false)}
        />
      )}
    </>
  );
}

export default NotificationListItem;
