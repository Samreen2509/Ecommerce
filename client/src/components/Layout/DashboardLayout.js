import React from 'react';
import DashboardHeader from '../Dashboard/Header/Header';
import DashboardSidebar from '../Dashboard/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="fixed h-full w-full">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <div className="custom-h-sidebar flex-grow overflow-auto px-5 py-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
