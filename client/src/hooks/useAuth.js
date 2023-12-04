import { useContext } from 'react';
import { AuthDispatchContext } from '../store/authContext';

const useAuth = () => {
  const dispatch = useContext(AuthDispatchContext);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const update = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch({ type: 'UPDATE' });
  };

  return { login, logout, update };
};

export default useAuth;
