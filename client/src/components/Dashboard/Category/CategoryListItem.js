import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSettingsSharp } from 'react-icons/io5';
import CategorySettingDialog from './CategorySettingDialog';
import { MdModeEditOutline } from 'react-icons/md';
import ImagePreview from '../Utils/ImagePreview';

function CategoryListItem({ id, index, name, image }) {
  const [isSettingDialog, setIsSettingDialog] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleSettingClick = () => {
    setIsSettingDialog(!isSettingDialog);
  };

  return (
    <>
      <div className="flex h-32 w-full items-center justify-center border-b text-gray-800">
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

        <div className="flex h-full w-32 items-center justify-center border-r text-base">
          <img
            src={image?.secure_url}
            onClick={() => setIsPreviewVisible(true)}
            className="h-full w-full border-none px-1 outline-none"
          />
        </div>

        {isPreviewVisible && (
          <ImagePreview
            image={image?.secure_url}
            onClose={() => setIsPreviewVisible(false)}
          />
        )}

        <Link
          to={`./?id=${id}&edit=true`}
          className="flex h-full w-36 cursor-pointer items-center justify-center border-r px-3 text-base"
        >
          <MdModeEditOutline />
        </Link>

        <div
          onClick={handleSettingClick}
          className="flex h-full w-36 cursor-pointer items-center justify-center px-3 text-base"
        >
          <IoSettingsSharp />
        </div>
      </div>

      {isSettingDialog && (
        <CategorySettingDialog
          id={id}
          title={name}
          onClose={() => setIsSettingDialog(false)}
        />
      )}
    </>
  );
}

export default CategoryListItem;
