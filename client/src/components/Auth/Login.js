import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useAuthDispatch } from '../../hooks/useAuthDispatch';
import spinner from '../../assets/spinner.gif';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const userData = await authService.login(email, password);
            dispatch({ type: 'LOGIN', payload: userData });
            setMessage('Login successful');
            setTimeout(() => navigate('/home'), 3000); // Delay navigation
        } catch (error) {
            setError(error.response.data.message || 'Login failed');
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
            <h2>Log In</h2>
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
            <div className="message-container">
                {isLoading && <img src={spinner} alt="Loading..." className="spinner" />}
                {error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div className='success-message'>{message}</div>
                )}
            </div>
        </form>
        </div>
    );
};