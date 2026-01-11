import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.connected = false;
    this.subscribers = new Map();
  }

  connect(token) {
    return new Promise((resolve, reject) => {
      const socket = new SockJS(`${import.meta.env.VITE_WS_BASE_URL || 'http://localhost:8080/ws'}`);
      this.stompClient = Stomp.over(socket);

      // Disable debug output
      this.stompClient.debug = null;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      this.stompClient.connect(
        headers,
        () => {
          this.connected = true;
          console.log('WebSocket connected');
          resolve();
        },
        (error) => {
          this.connected = false;
          console.error('WebSocket connection error:', error);
          reject(error);
        }
      );
    });
  }

  disconnect() {
    if (this.stompClient && this.connected) {
      this.stompClient.disconnect(() => {
        this.connected = false;
        console.log('WebSocket disconnected');
      });
    }
  }

  subscribeToChat(chatId, callback) {
    if (!this.connected) {
      console.error('WebSocket not connected');
      return null;
    }

    const subscription = this.stompClient.subscribe(
      `/topic/chat/${chatId}`,
      (message) => {
        const data = JSON.parse(message.body);
        callback(data);
      }
    );

    this.subscribers.set(chatId, subscription);
    return subscription;
  }

  unsubscribeFromChat(chatId) {
    const subscription = this.subscribers.get(chatId);
    if (subscription) {
      subscription.unsubscribe();
      this.subscribers.delete(chatId);
    }
  }

  sendMessage(destination, body) {
    if (!this.connected) {
      console.error('WebSocket not connected');
      return;
    }

    this.stompClient.send(destination, {}, JSON.stringify(body));
  }

  sendTypingStatus(chatId, isTyping) {
    this.sendMessage(`/app/chat/${chatId}/typing`, { isTyping });
  }

  subscribeToUser(userId, callback) {
    if (!this.connected) {
      console.error('WebSocket not connected');
      return null;
    }

    return this.stompClient.subscribe(
      `/topic/user/${userId}`,
      (message) => {
        const data = JSON.parse(message.body);
        callback(data);
      }
    );
  }

  isConnected() {
    return this.connected;
  }
}

export default new WebSocketService();
