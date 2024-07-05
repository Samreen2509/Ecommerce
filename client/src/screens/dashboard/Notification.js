import React from 'react';
import NotificationList from '../../components/Dashboard/Notification/NotificationList';

function Notification() {
  return (
    <>
      <div className="h-screen w-full ">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-black text-opacity-80">Notification</h1>
          <p className="mt-1 cursor-pointer text-sm font-medium text-black text-opacity-50 underline">
            {'> dashboard > notification'}
          </p>
        </div>
        <div className="mb-4 w-full p-3">
          <NotificationList />
        </div>
      </div>
    </>
  );
}

export default Notification;
