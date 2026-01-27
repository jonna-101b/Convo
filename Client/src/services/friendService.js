import api from "./api";
import { userService } from "./userService";

export const friendService = {
  async sendFriendRequest(receiverId) {
    const response = await api.post("/api/friends/requests", {
      receiverId,
    });
    return response.data;
  },

  async acceptFriendRequest(requestId) {
    const response = await api.post(
      `/api/friends/requests/${requestId}/accept`,
    );
    return response.data;
  },

  async rejectFriendRequest(requestId) {
    const response = await api.post(
      `/api/friends/requests/${requestId}/reject`,
    );
    return response.data;
  },

  async cancelFriendRequest(requestId) {
    const response = await api.delete(`/api/friends/requests/${requestId}`);
    return response.data;
  },

  async getPendingRequestsReceived() {
    const response = await api.get("/api/friends/requests/pending/received");
    return response.data;
  },

  async getPendingRequestsSent() {
    const response = await api.get("/api/friends/requests/pending/sent");
    return response.data;
  },

  async getAllRequests() {
    const response = await api.get("/api/friends/requests");
    return response.data;
  },

  async getFriends() {
    const response = await api.get("/api/friends/list");
    const friendIds = response.data || [];

    if (friendIds.length === 0) return [];

    const friendProfiles = await Promise.all(
      friendIds.map(async (id) => {
        try {
          return await userService.getUserById(id);
        } catch (error) {
          console.error(`Error fetching user ${id}:`, error);
          return null;
        }
      }),
    );

    return friendProfiles.filter(Boolean);
  },
};
