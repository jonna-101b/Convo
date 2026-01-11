import api from './api';

export const fileService = {
  async uploadFile(file, fileType) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', fileType);

    const response = await api.post('/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getFileMetadata(fileId) {
    const response = await api.get(`/api/files/${fileId}`);
    return response.data;
  },

  async downloadFile(fileId) {
    const response = await api.get(`/api/files/${fileId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  async deleteFile(fileId) {
    const response = await api.delete(`/api/files/${fileId}`);
    return response.data;
  },

  getFileUrl(fileId) {
    return `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api/files/${fileId}/download`;
  },
};
