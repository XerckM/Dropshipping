import axios from 'axios';

const API_URL = 'http://localhost:8000/api/user';

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  const response = axios.get(`${API_URL}/logout`, { withCredentials: true });
  return response.data;
};

const authService = {
  login,
  logout,
};

export default authService;
