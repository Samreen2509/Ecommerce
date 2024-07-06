import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/authSlice';
import { toast } from 'react-toastify';
import { debounce } from '../debounce';

function DropDown({ handleLeave }) {
  const dispatch = useDispatch();
  const { isUserLogin, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = debounce(() => {
    navigate('/');
    dispatch(logout());
    toast.success('User logged out');
  }, 300);

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
                className="flex h-full w-full items-center justify-start font-medium"
                onClick={handleLogout}
              >
                Logout
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
