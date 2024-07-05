import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  return userInfo.role === 'ADMIN' ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
