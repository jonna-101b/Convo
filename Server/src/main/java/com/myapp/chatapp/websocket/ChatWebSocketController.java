package com.myapp.chatapp.websocket;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketController {

    /**
     * Handle incoming messages from /app/chat/{chatId}
     * Broadcast to /topic/chat/{chatId}
     */
    @MessageMapping("/chat/{chatId}")
    @SendTo("/topic/chat/{chatId}")
    public ChatMessage handleChatMessage(
            @DestinationVariable Long chatId,
            ChatMessage message) {
        return message;
    }

    /**
     * Handle incoming typing notifications
     */
    @MessageMapping("/chat/{chatId}/typing")
    @SendTo("/topic/chat/{chatId}/typing")
    public TypingNotification handleTypingNotification(
            @DestinationVariable Long chatId,
            TypingNotification notification) {
        return notification;
    }

    /**
     * Handle user status updates (online/offline/away)
     */
    @MessageMapping("/user/status")
    @SendTo("/topic/user-status")
    public UserStatusMessage handleUserStatus(UserStatusMessage status) {
        return status;
    }

    /**
     * Chat message DTO for WebSocket
     */
    public static class ChatMessage {
        private Long chatId;
        private Long userId;
        private String username;
        private String content;
        private String messageType;
        private Long timestamp;

        public ChatMessage() {
        }

        public ChatMessage(Long chatId, Long userId, String username, String content, String messageType,
                Long timestamp) {
            this.chatId = chatId;
            this.userId = userId;
            this.username = username;
            this.content = content;
            this.messageType = messageType;
            this.timestamp = timestamp;
        }

        public Long getChatId() {
            return chatId;
        }

        public void setChatId(Long chatId) {
            this.chatId = chatId;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        public String getMessageType() {
            return messageType;
        }

        public void setMessageType(String messageType) {
            this.messageType = messageType;
        }

        public Long getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(Long timestamp) {
            this.timestamp = timestamp;
        }
    }

    /**
     * Typing notification DTO
     */
    public static class TypingNotification {
        private Long chatId;
        private Long userId;
        private String username;
        private boolean isTyping;

        public TypingNotification() {
        }

        public TypingNotification(Long chatId, Long userId, String username, boolean isTyping) {
            this.chatId = chatId;
            this.userId = userId;
            this.username = username;
            this.isTyping = isTyping;
        }

        public Long getChatId() {
            return chatId;
        }

        public void setChatId(Long chatId) {
            this.chatId = chatId;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public boolean isTyping() {
            return isTyping;
        }

        public void setTyping(boolean typing) {
            isTyping = typing;
        }
    }

    /**
     * User status message DTO
     */
    public static class UserStatusMessage {
        private Long userId;
        private String username;
        private String status; // ONLINE, OFFLINE, AWAY
        private Long timestamp;

        public UserStatusMessage() {
        }

        public UserStatusMessage(Long userId, String username, String status, Long timestamp) {
            this.userId = userId;
            this.username = username;
            this.status = status;
            this.timestamp = timestamp;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public Long getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(Long timestamp) {
            this.timestamp = timestamp;
        }
    }
}
