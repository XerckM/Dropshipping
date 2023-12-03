import axios from 'axios';

const API_URL = 'http://localhost:8000/api/user';

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${API_URL}/logout`, { withCredentials: true });
  return response.data;
};

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Registration failed:", error.response.data);
    return { success: false, message: error.response.data };
  }
}

const authService = {
  login,
  logout,
  register
};

export default authService;
