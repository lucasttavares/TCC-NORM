import React from 'react';
import { Navigate } from 'react-router-dom';
import { AdminRouteI } from '../../utils/types';

const AdminRoute: React.FC<AdminRouteI> = ({ children, isPrivate }) => {
  const storage = localStorage.getItem(`${process.env.REACT_APP_ADMIN_KEY}`);
  const isAuthenticated = storage === `${process.env.REACT_APP_ADMIN_VALUE}`;

  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!isPrivate && isAuthenticated) {
    return <Navigate to="/private/admin" />;
  }

  return children;
};

export default AdminRoute;
