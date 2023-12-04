import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthState } from '../hooks/useAuthState'; // Adjust the import path as needed

const PublicRoutes = () => {
    const { user } = useAuthState();
    const location = useLocation();

    if (user) {
        // Redirect to home or another protected route if the user is logged in
        return <Navigate to="/home" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default PublicRoutes;
