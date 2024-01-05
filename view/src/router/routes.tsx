import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/public/home';
import Login from '../pages/public/login';
import Register from '../pages/public/register';
import Profile from '../pages/public/profile';
import LoginAdmin from '../pages/public/admin';
// import FormAdmin from '../pages/private/admin';
import AdminRoute from './AdminRoute';
import HomeAdmin from '../pages/private/home';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} /> */}

        <Route
          path="/admin"
          element={
            <AdminRoute isPrivate={false}>
              <LoginAdmin />
            </AdminRoute>
          }
        />

        {/*         <Route
          path="/private/admin"
          element={
            <AdminRoute isPrivate={true}>
              <FormAdmin />
            </AdminRoute>
          }
        /> */}

        <Route
          path="/private/home"
          element={
            <AdminRoute isPrivate={true}>
              <HomeAdmin />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
