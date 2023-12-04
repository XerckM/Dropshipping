import React from 'react';
import { Navigate, useLocation, Route, Outlet } from 'react-router-dom';
import { useAuthState } from '../hooks/useAuthState'; // Adjust the import path as needed

const ProtectedRoutes = () => {
  const { user, loading } = useAuthState();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
