import React from 'react';
import SideNavbar from './SideNavbar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../../../features/authSlice';

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    dispatch(logout());
    toast.success('User logged out');
  };

  return (
    <>
      <div className="custom-h-sidebar flex w-72 flex-col border border-r py-2">
        <SideNavbar />
        <div className="my-4 w-full px-4">
          <button
            onClick={handleLogout}
            className="flex h-10 w-full items-center justify-center rounded-md bg-gray-800 font-semibold text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
