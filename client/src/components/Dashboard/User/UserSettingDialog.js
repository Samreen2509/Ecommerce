import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../../features/dashboardSlice/dashUserSlice';

function ProductSettingDialog({ id, title, onClose }) {
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    setIsDeleteUser(!isDeleteUser);
  };

  const handleSaveClick = () => {
    if (isDeleteUser) {
      dispatch(deleteUser({ id }));
    }
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="w-2/5 rounded-md border bg-white p-4">
          <h1 className="mb-2 text-base font-medium text-opacity-70">
            {title}
          </h1>

          <div className="flex w-full flex-col items-center justify-center">
            <div className="flex w-full items-center justify-between">
              <div className="text-base font-medium text-opacity-70">
                Delete User
              </div>
              <div
                onClick={handleDeleteClick}
                className={`flex h-10 items-center justify-center rounded-md border ${isDeleteUser ? 'border-red-800 bg-red-200' : 'border-gray-400'} cursor-pointer px-2 hover:bg-gray-200`}
              >
                Delete
              </div>
            </div>
          </div>

          <div className="mt-4 flex w-full items-center justify-end gap-x-3">
            <div
              onClick={onClose}
              className="flex h-10  cursor-pointer items-center justify-center rounded-md border border-gray-400 px-2 hover:bg-gray-200"
            >
              Close
            </div>
            <div
              onClick={handleSaveClick}
              className="gover:bg-gray-600 flex h-10 cursor-pointer items-center justify-center rounded-md border border-gray-800 bg-gray-800 px-2 text-white"
            >
              Save
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductSettingDialog;
