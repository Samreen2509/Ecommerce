import React, { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../Utils/Capitalize';
import { updateOrder } from '../../../features/orderSlice';
import { useDispatch, useSelector } from 'react-redux';

function OrderSettingDialog({ id, status, userId, orderId, onClose }) {
  const [orderData, setOrderData] = useState(null);
  const { loading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    setOrderData({ status: status });
  }, [status]);

  const handleSaveClick = () => {
    if (orderData) {
      dispatch(updateOrder({ orderData, userId, orderId }));
    }
    if (!loading) {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  orderStatus = ['PENDING', 'CANCELLED', 'DELIVERED'];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="w-2/5 rounded-md border bg-white p-3">
          <h1 className="text-base font-medium text-opacity-70">{id}</h1>
          <div className="flex w-full flex-col items-center justify-center">
            <div className="flex w-full items-center justify-between">
              <label htmlFor="Status">Status</label>
              <select
                id="status"
                name="status"
                className="h-10 w-48 rounded-md border border-gray-400 bg-transparent px-2 py-2 text-base"
                value={status}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select
                </option>
                {orderStatus?.map((item, index) => (
                  <option value={item} key={index}>
                    {capitalizeFirstLetter(item)}
                  </option>
                ))}
              </select>
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

export default OrderSettingDialog;
