import api from './api';

export const userService = {
  async getCurrentUser() {
    const response = await api.get('/api/users/me');
    return response.data;
  },

  async getUserById(userId) {
    const response = await api.get(`/api/users/${userId}`);
    return response.data;
  },

  async getUserByUsername(username) {
    const response = await api.get(`/api/users/username/${username}`);
    return response.data;
  },

  async updateProfile(firstName, lastName, bio) {
    const response = await api.put('/api/users/me/profile', {
      firstName,
      lastName,
      bio,
    });
    return response.data;
  },

  async changePassword(currentPassword, newPassword) {
    const response = await api.put('/api/users/me/password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  async getActiveUsers() {
    const response = await api.get('/api/users/active');
    return response.data;
  },

  async checkUsernameAvailability(username) {
    const response = await api.get(`/api/users/check/username/${username}`);
    return response.data;
  },

  async checkEmailAvailability(email) {
    const response = await api.get(`/api/users/check/email/${email}`);
    return response.data;
  },

  async getUserSettings() {
    const response = await api.get('/api/settings/me');
    return response.data;
  },

  async updateUserSettings(settings) {
    const response = await api.put('/api/settings/me', settings);
    return response.data;
  },
};
