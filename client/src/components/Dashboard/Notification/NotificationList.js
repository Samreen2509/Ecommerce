import React, { useState, useEffect } from 'react';
import NotificationListItem from './NotificationListItem';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotification } from '../../../features/notificationSlice';

function NotificationList() {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getAllNotification());
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="my-2 flex w-full items-center justify-start">
          <ul className="flex w-full items-center justify-start gap-x-2">
            <li className="flex h-10 cursor-pointer items-center justify-center rounded-md border border-gray-800 bg-gray-800 px-4 text-white hover:bg-gray-700">
              All
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
          <div className="flex h-full w-full items-center justify-center border-r px-3 text-base font-medium">
            Notification
          </div>
          <div className="flex h-full w-36 items-center justify-center px-3 text-base font-medium">
            Setting
          </div>
        </div>
        <div className="my-1 flex w-full flex-col items-center justify-center rounded-bl-md rounded-br-md border text-gray-800">
          {notification.map((item, index) => {
            return (
              <NotificationListItem
                key={index}
                id={item._id}
                index={index + 1}
                notification={item.notification}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default NotificationList;
