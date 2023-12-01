import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from '../store/authContext'; // Adjust the import path as needed

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthState();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
