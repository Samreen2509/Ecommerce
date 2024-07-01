import React from 'react';
import SideNavbar from './SideNavbar';

function Sidebar() {
  return (
    <>
      <div className="custom-h-sidebar flex w-72 flex-col border border-r py-2">
        <SideNavbar />
        <div className="my-4 w-full px-4">
          <div className="flex h-10 items-center justify-center rounded-md bg-gray-800 font-semibold text-white">
            Logout
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
