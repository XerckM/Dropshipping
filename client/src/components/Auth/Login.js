import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useAuthDispatch } from '../../hooks/useAuthDispatch';
import { useAuthState } from '../../hooks/useAuthState';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useAuthDispatch();
    const { user } = useAuthState();
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await authService.login(email, password);
            dispatch({ type: 'LOGIN', payload: userData });
            navigate('/home');
        } catch (error) {
            setError(error.response.data.message || 'Login failed');
        }
    };

    if (user) {
        return <div>Welcome back, {user.firstname}!</div>;
    }

    return (
        <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
            <h2>Log In</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="form">
            <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            </div>
            <div className="form">
            <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            </div>
            <button type="submit">Log In</button>
        </form>
        </div>
    );
};