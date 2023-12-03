import { useContext } from 'react';
import { AuthDispatchContext } from '../store/authContext';

export const useAuthDispatch = () => {
  const dispatch = useContext(AuthDispatchContext);
  return dispatch;
};
