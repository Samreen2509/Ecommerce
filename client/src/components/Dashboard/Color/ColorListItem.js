import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSettingsSharp } from 'react-icons/io5';
import ColorSettingDialog from './ColorSettingDialog';
import { MdModeEditOutline } from 'react-icons/md';

function ColorListItem({ id, index, name, hexCode }) {
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

        <div className="flex h-full flex-1 cursor-pointer items-center justify-start border-r px-2 text-base hover:underline">
          <Link
            className="flex h-full w-full items-center justify-start"
            to={`./?id=${id}&edit=false`}
          >
            {name}
          </Link>
        </div>

        <div className="flex h-full w-28 items-center justify-center border-r px-3 text-base">
          {hexCode}
        </div>

        <div className="flex h-full w-28 items-center justify-center border-r p-3 text-base">
          <div
            className="h-full w-full rounded-md"
            style={{ backgroundColor: hexCode }}
          ></div>
        </div>

        <Link
          to={`./?id=${id}&edit=true`}
          className="flex h-full w-28 cursor-pointer items-center justify-center border-r px-3 text-base"
        >
          <MdModeEditOutline />
        </Link>

        <div
          onClick={handleSettingClick}
          className="flex h-full w-28 cursor-pointer items-center justify-center px-3 text-base"
        >
          <IoSettingsSharp />
        </div>
      </div>

      {isSettingDialog && (
        <ColorSettingDialog
          id={id}
          title={name}
          onClose={() => setIsSettingDialog(false)}
        />
      )}
    </>
  );
}

export default ColorListItem;
