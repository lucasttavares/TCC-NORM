import React from 'react';
import { Navigate } from 'react-router-dom';
import { AdminRouteI } from '../../utils/types';
import { getStorage } from '../../utils/storage';

const AdminRoute: React.FC<AdminRouteI> = ({ children, isPrivate }) => {
  const storage = getStorage(`${process.env.REACT_APP_ADMIN_KEY}`);
  const isAuthenticated = storage === `${process.env.REACT_APP_ADMIN_VALUE}`;

  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!isPrivate && isAuthenticated) {
    return <Navigate to="/private/home" />;
  }

  return children;
};

export default AdminRoute;
