import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from '../store/authContext'; // Adjust the import path as needed

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthState(); // Destructure loading from the context
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator or null while loading
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
