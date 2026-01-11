import api from './api';

export const chatService = {
  async createGroupChat(name, description, participantIds) {
    const response = await api.post('/api/chats/groups', {
      groupName: name,
      description,
      initialMemberIds: participantIds,
    });
    return response.data;
  },

  async getChatById(chatId) {
    const response = await api.get(`/api/chats/${chatId}`);
    return response.data;
  },

  async getAllChats() {
    const response = await api.get('/api/chats');
    return response.data;
  },

  async getOrCreateDirectChat(userId) {
    const response = await api.get(`/api/chats/direct/${userId}`);
    return response.data;
  },

  async addParticipant(chatId, userId) {
    const response = await api.post(`/api/chats/${chatId}/participants`, {
      userId,
    });
    return response.data;
  },

  async removeParticipant(chatId, userId) {
    const response = await api.delete(`/api/chats/${chatId}/participants/${userId}`);
    return response.data;
  },

  async updateGroupInfo(chatId, name, description) {
    const response = await api.put(`/api/chats/${chatId}/group`, {
      name,
      description,
    });
    return response.data;
  },

  async updateParticipantRole(chatId, userId, role) {
    const response = await api.put(`/api/chats/${chatId}/participants/role`, {
      userId,
      role,
    });
    return response.data;
  },

  async leaveChat(chatId) {
    const response = await api.post(`/api/chats/${chatId}/leave`);
    return response.data;
  },

  async getChatParticipants(chatId) {
    const response = await api.get(`/api/chats/${chatId}/participants`);
    return response.data;
  },
};
