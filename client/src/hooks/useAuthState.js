import { useContext } from 'react';
import { AuthStateContext } from '../store/authContext';

export const useAuthState = () => {
  const state = useContext(AuthStateContext);
  return state;
};
