import React, { useState } from 'react';
import authService from '../services/authService';
import { useAuthDispatch, useAuthState } from '../store/authContext';
import './AuthView.css';

export const AuthView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useAuthDispatch();
  const { user } = useAuthState();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await authService.login(email, password);
      dispatch({ type: 'LOGIN', payload: userData });
    } catch (error) {
      setError(error.response.data.message || 'Login failed');
    }
  };

  if (user) {
    return <div>Welcome back, {user.firstname}!</div>;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}
