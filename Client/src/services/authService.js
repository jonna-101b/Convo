import api from './api';

export const authService = {
  async register(username, email, password, firstName, lastName) {
    const response = await api.post('/api/auth/register', {
      username,
      email,
      password,
      firstName,
      lastName,
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', response.data.username);
    }
    
    return response.data;
  },

  async login(usernameOrEmail, password) {
    const response = await api.post('/api/auth/login', {
      usernameOrEmail,
      password,
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', response.data.username);
    }
    
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  getCurrentUserId() {
    return localStorage.getItem('userId');
  },

  getCurrentUsername() {
    return localStorage.getItem('username');
  },
};
