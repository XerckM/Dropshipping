import React from 'react';
import useAuth from '../../hooks/useAuth';
import authService from '../../services/authService';
import './LogoutButton.css'; // Import the CSS

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    await authService.logout();
    logout();
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
