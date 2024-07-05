import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/" />;
  }

  if (userInfo.role !== 'ADMIN') {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
