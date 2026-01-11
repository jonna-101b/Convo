import { useState, useEffect, useRef, useCallback } from 'react';
import { format } from 'date-fns';
import useSelectedChatHook from '../../hooks/useSelectedChatHook';
import useInfoDisplayHook from '../../hooks/useInfoDisplayHook';
import { messageService } from '../../../../services/messageService';
import { chatService } from '../../../../services/chatService';
import { authService } from '../../../../services/authService';
import { fileService } from '../../../../services/fileService';
import websocketService from '../../../../services/websocketService';
import './ChatWindow.css';

function ChatWindow() {
  const { selectedChat, setSelectedChat } = useSelectedChatHook();
  const { setInfoDisplay } = useInfoDisplayHook();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const currentUserId = authService.getCurrentUserId();

  useEffect(() => {
    if (selectedChat?.chatId) {
      loadMessages();
      subscribeToChat();
    }

    return () => {
      if (selectedChat?.chatId) {
        websocketService.unsubscribeFromChat(selectedChat.chatId);
      }
    };
  }, [selectedChat?.chatId]);

  const mergeMessages = useCallback((incoming = []) => {
    setMessages((prev) => {
      const byId = new Map(prev.map((m) => [m.id, m]));

      let changed = false;
      for (const msg of incoming) {
        const existing = byId.get(msg.id);
        if (!existing) {
          byId.set(msg.id, msg);
          changed = true;
        } else if (
          existing.content !== msg.content ||
          existing.createdAt !== msg.createdAt ||
          existing.senderUsername !== msg.senderUsername
        ) {
          byId.set(msg.id, msg);
          changed = true;
        }
      }

      if (!changed) return prev;

      return Array.from(byId.values()).sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    });
  }, []);

  const loadMessages = useCallback(async () => {
    if (!selectedChat?.chatId) return;
    try {
      if (!initialLoaded) setLoading(true);
      const msgs = await messageService.getRecentMessages(selectedChat.chatId, 50);
      mergeMessages(msgs.reverse());
      if (!initialLoaded) setInitialLoaded(true);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  }, [initialLoaded, mergeMessages, selectedChat?.chatId]);

  // Poll every 3s; merge without resetting list to avoid UI wiggle
  useEffect(() => {
    if (!selectedChat?.chatId) return;

    loadMessages();
    const intervalId = setInterval(() => {
      loadMessages();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [selectedChat?.chatId, loadMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const subscribeToChat = () => {
    if (websocketService.isConnected()) {
      websocketService.subscribeToChat(selectedChat.chatId, (newMessage) => {
        mergeMessages([newMessage]);
      });
    }
  };

  const ensureChatId = async () => {
    if (selectedChat?.chatId) return selectedChat.chatId;
    if (selectedChat?.otherUserId) {
      const chatId = await chatService.getOrCreateDirectChat(selectedChat.otherUserId);
      setSelectedChat({ ...selectedChat, chatId });
      return chatId;
    }
    return null;
  };

  const handleSendMessage = async () => {
    const content = inputMessage.trim();
    if (!content || !selectedChat) return;

    try {
      const chatId = await ensureChatId();
      if (!chatId) return;

      setInputMessage('');
      await messageService.sendTextMessage(chatId, content);
      await loadMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      setInputMessage(content);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !selectedChat) return;

    const isImage = file.type.startsWith('image/');
    const messageType = isImage ? 'IMAGE' : 'FILE';

    try {
      setUploading(true);
      const chatId = await ensureChatId();
      if (!chatId) return;

      const metadata = await fileService.uploadFile(file, messageType);
      await messageService.sendFileMessage(chatId, file.name, messageType, metadata.id);
      await loadMessages();
    } catch (error) {
      console.error('Error sending file:', error);
    } finally {
      setUploading(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      return format(date, 'HH:mm');
    } catch {
      return '';
    }
  };

  const renderAttachments = (message) => {
    if (!message.fileMetadata || message.fileMetadata.length === 0) return null;

    return (
      <div className="message-attachments">
        {message.fileMetadata.map((file) => {
          const fileUrl = fileService.getFileUrl(file.id);
          const isImage = message.messageType === 'IMAGE' || file.fileType === 'IMAGE' || (file.contentType || '').startsWith('image/');

          return (
            <div key={file.id} className="attachment-item">
              {isImage ? (
                <img src={fileUrl} alt={file.fileName} className="attachment-image" />
              ) : (
                <a href={fileUrl} target="_blank" rel="noreferrer" className="attachment-link">
                  📎 {file.fileName || 'Download file'}
                </a>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (!selectedChat) {
    return (
      <div className="chat-window">
        <div className="empty-chat">
          <h2>Welcome to Convo</h2>
          <p>Select a chat to start messaging</p>
          <p>or find friends to begin a conversation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-info">
          <div className="chat-profile-pic">
            {getInitials(selectedChat.name || selectedChat.groupName)}
          </div>
          <div className="chat-name">{selectedChat.name || selectedChat.groupName || 'Chat'}</div>
        </div>

        <div className="chat-actions">
          <p onClick={() => setInfoDisplay(true)} title="Info">
            ℹ️
          </p>
        </div>
      </div>

      <div className="chat-body">
        {loading && !initialLoaded ? (
          <div style={{ textAlign: 'center', color: 'var(--secondary-font-color-light-mode)' }}>
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--secondary-font-color-light-mode)' }}>
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = String(message.senderId) === String(currentUserId);
            return (
              <div
                key={message.id}
                className={`message-group ${isOwn ? 'own' : 'other'}`}
              >
                {!isOwn && (
                  <div className="message-sender">{message.senderUsername}</div>
                )}
                <div className="message-bubble">{message.content}</div>
                {renderAttachments(message)}
                <div className="message-time">{formatTime(message.createdAt)}</div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
          />
          <div className="chat-input-actions">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button onClick={handleFileButtonClick} disabled={uploading} title="Send file or image">
              📎
            </button>
            <button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
