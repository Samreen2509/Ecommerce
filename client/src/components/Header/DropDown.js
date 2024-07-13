import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/authSlice';
import { toast } from 'react-toastify';
import { debounce } from '../debounce';
import { FiLoader } from 'react-icons/fi';

function DropDown({
  handleLeave,
  handleHover,
  userInfo,
  isUserLogin,
  isLoadingLogout,
}) {
  const dispatch = useDispatch();

  const handleLogout = debounce(() => {
    if (!isLoadingLogout) {
      dispatch(logout());
      toast.success('User logged out');
      handleLeave();
    }
  }, 500);

  return (
    <>
      <div
        onMouseLeave={handleLeave}
        onMouseEnter={handleHover}
        className="absolute right-2 top-[50px]"
      >
        <div className="mt-[38px] w-44 rounded-md bg-white py-2 shadow-lg">
          {isUserLogin ? (
            <ul className="flex w-full flex-col items-center justify-center">
              <li className="flex h-10 w-full items-center justify-center border-b px-3">
                <Link
                  className=": flex h-full w-full items-center justify-start font-medium hover:text-primary"
                  to="./profile"
                >
                  Profile
                </Link>
              </li>
              <li className="flex h-10 w-full items-center justify-center border-b px-3">
                <Link
                  className="flex h-full w-full items-center justify-start font-medium hover:text-primary"
                  to="./myorders"
                >
                  Orders
                </Link>
              </li>

              {userInfo?.role == 'ADMIN' && (
                <li className="flex h-10 w-full items-center justify-center border-b px-3">
                  <Link
                    className="flex h-full w-full items-center justify-start font-medium hover:text-primary"
                    to="./dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li className="flex h-10 w-full items-center justify-center border-b px-3">
                <div
                  className={`flex h-full w-full items-center justify-start font-medium hover:text-primary ${isLoadingLogout ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
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
              <li className="flex h-10 w-full items-center justify-center border-b px-3">
                <Link
                  className="flex h-full w-full items-center justify-start font-medium hover:text-primary"
                  to="./Login"
                >
                  Login
                </Link>
              </li>

              <li className="flex h-10 w-full items-center justify-center border-b px-3">
                <Link
                  className="flex h-full w-full items-center justify-start font-medium hover:text-primary"
                  to="./register"
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default DropDown;
