import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/authSlice';
import { toast } from 'react-toastify';
import { debounce } from '../debounce';
import { FiLoader } from 'react-icons/fi';

function DropDown({ handleLeave, userInfo, isUserLogin, isLoadingLogout }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = debounce(() => {
    if (!isLoadingLogout) {
      dispatch(logout());
      toast.success('User logged out');
      navigate('/login');
    }
  }, 500);

  return (
    <>
      <div
        onMouseLeave={handleLeave}
        className="absolute right-2 top-[88px] w-44 rounded-md bg-white p-2 px-3 shadow-lg"
      >
        {isUserLogin ? (
          <ul className="flex w-full flex-col items-center justify-center">
            <li className="flex h-10 w-full items-center justify-center border-b">
              <Link
                className="flex h-full w-full items-center justify-start font-medium"
                to="./profile"
              >
                Profile
              </Link>
            </li>
            <li className="flex h-10 w-full items-center justify-center border-b">
              <Link
                className="flex h-full w-full items-center justify-start font-medium"
                to="./myorders"
              >
                Orders
              </Link>
            </li>

            {userInfo?.role == 'ADMIN' && (
              <li className="flex h-10 w-full items-center justify-center border-b">
                <Link
                  className="flex h-full w-full items-center justify-start font-medium"
                  to="./dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li className="flex h-10 w-full items-center justify-center border-b">
              <div
                className={`flex h-full w-full items-center justify-start font-medium ${isLoadingLogout ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                onClick={handleLogout}
              >
                {isLoadingLogout ? (
                  <div className="flex items-center justify-center">
                    <FiLoader className="mr-2 h-5 w-5 animate-spin" />
                    Logging out...
                  </div>
                ) : (
                  'Logout'
                )}
              </div>
            </li>
          </ul>
        ) : (
          <ul>
            <li className="flex h-10 w-full items-center justify-center border-b">
              <Link
                className="flex h-full w-full items-center justify-start font-medium"
                to="./Login"
              >
                Login
              </Link>
            </li>

            <li className="flex h-10 w-full items-center justify-center border-b">
              <Link
                className="flex h-full w-full items-center justify-start font-medium"
                to="./register"
              >
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default DropDown;
