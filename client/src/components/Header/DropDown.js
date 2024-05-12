import React from 'react';
import { Link } from 'react-router-dom';

function DropDown({ handleLeave }) {
  return (
    <div
      onMouseLeave={handleLeave}
      className="absolute right-[16%] top-[15%] z-10 h-[200px] w-[200px] bg-gray-50   "
    >
      <div className="flex flex-col gap-y-1 border-b p-2">
        <h3>Welcome</h3>
        <p className="text-xs text-gray-600">
          To access account and manage orders
        </p>
        <Link
          to={'/login'}
          className="mt-2 border border-orange-400 p-2 text-center text-red-400 hover:bg-orange-400 hover:text-white"
        >
          LOGIN
        </Link>
        <Link
          to={'/register'}
          className="mt-2 border border-orange-400 p-2 text-center text-red-400 hover:bg-orange-400 hover:text-white"
        >
          SIGNUP
        </Link>
      </div>
      <div className="flex flex-col gap-y-1 p-1 px-3 text-sm">
        <Link to={'/myorders'} className="font-normal">
          My Orders
        </Link>
        <Link to={'/wishlist'} className="font-normal">
          My Wishlist
        </Link>
      </div>
    </div>
  );
}

export default DropDown;
