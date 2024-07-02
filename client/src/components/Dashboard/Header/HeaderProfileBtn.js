import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowDropDown } from 'react-icons/md';
import { IoMdNotifications } from 'react-icons/io';

function HeaderProfileBtn({ username }) {
  const [isDropdown, setIsDropdown] = useState(false);
  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleLogout = () => {
    // logout api call
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="mx-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-gray-800 text-xl text-white hover:bg-gray-600">
          <IoMdNotifications />
        </div>
        <div className="text-md flex h-10 w-28 items-center justify-center rounded-bl-md rounded-tl-md bg-gray-800 font-semibold text-white text-opacity-80 hover:bg-gray-700">
          @{username}
        </div>
        <div
          onClick={toggleDropdown}
          className="mx-[2px] flex h-10 w-10 cursor-pointer items-center justify-center rounded-br-md rounded-tr-md bg-gray-800 text-xl text-white hover:bg-gray-700"
        >
          <MdArrowDropDown />
        </div>
      </div>

      {isDropdown && (
        <div className="absolute right-10 top-14 mt-2 w-40 rounded-md border bg-white">
          <div className="flex h-10 items-center justify-start border-b px-3 hover:bg-gray-200">
            <Link
              to="./profile"
              className="flex h-full w-full items-center justify-start"
            >
              Profile
            </Link>
          </div>
          <div className="flex h-10 items-center justify-center border-b px-3 hover:bg-gray-200">
            <Link
              to="./setting"
              className="flex h-full w-full items-center justify-start"
            >
              Settings
            </Link>
          </div>
          <div
            onClick={handleLogout}
            className="flex h-10 cursor-pointer items-center justify-start border-b px-3 hover:bg-gray-200"
          >
            Logout
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderProfileBtn;
