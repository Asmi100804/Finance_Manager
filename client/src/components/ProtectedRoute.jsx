import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../contexts/AppProvider';

const ProtectedRoute = () => {
  const { user } = useAppContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
// this is used as a pass if user is logged in Outlet is activated which leads to showing the website content else we are lavigated to login page