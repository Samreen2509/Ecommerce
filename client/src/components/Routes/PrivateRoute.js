import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isUserLogin } = useSelector((state) => state.auth);

  return isUserLogin ? <Navigate to="/" /> : <Component {...rest} />;
};

export default PrivateRoute;
