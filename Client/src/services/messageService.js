import api from './api';

export const messageService = {
  async sendTextMessage(chatId, content) {
    const response = await api.post('/api/messages', {
      chatId,
      content,
    });
    return response.data;
  },

  async sendFileMessage(chatId, content, messageType, fileMetadataId) {
    const response = await api.post('/api/messages/file', {
      chatId,
      content,
      messageType,
      fileMetadataId,
    });
    return response.data;
  },

  async getMessageById(messageId) {
    const response = await api.get(`/api/messages/${messageId}`);
    return response.data;
  },

  async getMessagesForChat(chatId, page = 0, size = 50) {
    const response = await api.get(`/api/messages/chat/${chatId}`, {
      params: { page, size },
    });
    return response.data;
  },

  async getActiveMessagesForChat(chatId, page = 0, size = 50) {
    const response = await api.get(`/api/messages/chat/${chatId}/active`, {
      params: { page, size },
    });
    return response.data;
  },

  async getRecentMessages(chatId, limit = 20) {
    const response = await api.get(`/api/messages/chat/${chatId}/recent`, {
      params: { limit },
    });
    return response.data;
  },

  async editMessage(messageId, content) {
    const response = await api.put(`/api/messages/${messageId}`, {
      content,
    });
    return response.data;
  },

  async deleteMessage(messageId) {
    const response = await api.delete(`/api/messages/${messageId}`);
    return response.data;
  },
};
