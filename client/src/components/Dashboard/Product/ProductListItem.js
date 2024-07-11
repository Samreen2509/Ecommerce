import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSettingsSharp } from 'react-icons/io5';
import ProductSettingDialog from './ProductSettingDialog';
import { MdModeEditOutline } from 'react-icons/md';
import { PiCircleNotch } from 'react-icons/pi';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../../features/dashboardSlice';
import { toast } from 'react-toastify';

function ProductListItem({ id, index, name, stock, price }) {
  const [isSettingDialog, setIsSettingDialog] = useState(false);
  const { loading, SuccessMsg } = useSelector((state) => state.dashboard);
  const discpatch = useDispatch();

  const handleSettingClick = () => {
    setIsSettingDialog(!isSettingDialog);
  };

  const handleDelete = () => {
    discpatch(deleteProduct({ id }));
    if (SuccessMsg) {
      toast.success(SuccessMsg);
    }
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
          <Link
            className="flex h-full w-full items-center justify-start"
            to={`./?id=${id}&edit=false`}
          >
            {name}
          </Link>
        </div>

        <div className="flex h-full w-36 items-center justify-center border-r px-3 text-base">
          {stock}
        </div>

        <div className="flex h-full w-36 items-center justify-center border-r px-3 text-base">
          {price}
        </div>

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
        <div
          onClick={handleDelete}
          className="flex h-full w-36 cursor-pointer items-center justify-center px-3 text-base"
        >
          {loading ? (
            <PiCircleNotch size={23} className="animate-spin" />
          ) : (
            <AiFillDelete size={23} />
          )}
        </div>
      </div>

      {isSettingDialog && (
        <ProductSettingDialog
          id={id}
          title={name}
          onClose={() => setIsSettingDialog(false)}
        />
      )}
    </>
  );
}

export default ProductListItem;
