import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/authSlice';
import { toast } from 'react-toastify';

function DropDown({ handleLeave }) {
  const dispatch = useDispatch();
  const { isUserLogin, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    dispatch(logout());
    toast.success('User logged out');
  };

  return (
    <div
      onMouseLeave={handleLeave}
      className="absolute right-0 top-[11%] z-10 max-h-full w-[200px] content-center overflow-hidden bg-gray-200"
    >
      {isUserLogin ? (
        <div className="flex flex-col gap-y-1 border-b p-2">
          <h3>Welcome, {userInfo.name && `Aditya`}</h3>
        </div>
      ) : (
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
      )}
      <div className="flex flex-col gap-y-1 p-1 px-3 text-base">
        <Link to={'/myorders'} className="font-normal hover:text-orange-400">
          Orders
        </Link>
        <Link to={'/wishlist'} className="font-normal hover:text-orange-400">
          Wishlist
        </Link>
        {isUserLogin ? (
          <button
            className="text-start font-normal hover:text-orange-400"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default DropDown;
