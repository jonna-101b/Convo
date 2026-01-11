import { useContext } from "react";
import { ChatsContext } from "../contexts/ChatsContext";
import { chatService } from "../services/chatService";
import { authService } from "../services/authService";

function useChatsHook() {
  const { state, dispatch } = useContext(ChatsContext);

  const normalizeChat = async (chat) => {
    const currentUserId = authService.getCurrentUserId();
    const baseChat = {
      ...chat,
      chatId: chat.id,
      id: chat.id,
      isGroup: chat.chatType === "GROUP",
      name: chat.chatType === "GROUP" ? chat.groupName || "Group Chat" : "Direct Chat",
      description: chat.groupDescription,
    };

    if (baseChat.isGroup) return baseChat;

    try {
      const participants = await chatService.getChatParticipants(chat.id);
      const otherUser = participants.find(
        (participant) => String(participant.userId) !== String(currentUserId)
      );

      return {
        ...baseChat,
        participants,
        name: otherUser?.username || baseChat.name,
      };
    } catch (error) {
      console.error("Error normalizing chat:", error);
      return baseChat;
    }
  };

  const createGroupChat = async (name, description, participantIds) => {
    try {
      const chatId = await chatService.createGroupChat(name, description, participantIds);
      const chat = await chatService.getChatById(chatId);
      const normalizedChat = await normalizeChat(chat);
      dispatch({ type: "ADD_CHAT", payload: normalizedChat });
      return normalizedChat;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const getOrCreateDirectChat = async (userId) => {
    try {
      const chatId = await chatService.getOrCreateDirectChat(userId);
      const chat = await chatService.getChatById(chatId);
      const normalizedChat = await normalizeChat(chat);
      
      // Check if chat already exists in state
      const existingChat = state.chats.find(c => c.chatId === chatId);
      if (!existingChat) {
        dispatch({ type: "ADD_CHAT", payload: normalizedChat });
      }
      
      return normalizedChat;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const updateChat = (chatId, updates) => {
    dispatch({ type: "UPDATE_CHAT", payload: { chatId, ...updates } });
  };

  const leaveChat = async (chatId) => {
    try {
      await chatService.leaveChat(chatId);
      dispatch({ type: "REMOVE_CHAT", payload: chatId });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const refreshChats = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const rawChats = await chatService.getAllChats();
      const normalizedChats = await Promise.all(rawChats.map((chat) => normalizeChat(chat)));
      dispatch({ type: "SET_CHATS", payload: normalizedChats });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  return {
    chats: state.chats,
    loading: state.loading,
    error: state.error,
    createGroupChat,
    getOrCreateDirectChat,
    updateChat,
    leaveChat,
    refreshChats,
  };
}

export default useChatsHook;
