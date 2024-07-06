import React from 'react';
import { useSelector } from 'react-redux';
import ErrorPage from '../Error/ErrorPage';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo?.role === 'ADMIN' ? children : <ErrorPage />;
};

export default PrivateRoute;
