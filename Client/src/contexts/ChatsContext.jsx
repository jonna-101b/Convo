import { createContext, useReducer, useEffect } from "react";
import { chatService } from "../services/chatService";
import { authService } from "../services/authService";

export const ChatsContext = createContext();

function chatsReducer(state, action) {
  const uniqueById = (list) => {
    const seen = new Set();
    const result = [];
    for (const item of list) {
      const id = item.chatId || item.id;
      if (!id || seen.has(id)) continue;
      seen.add(id);
      result.push(item);
    }
    return result;
  };

  switch (action.type) {
    case "SET_CHATS":
      return { ...state, chats: uniqueById(action.payload), loading: false };
    
    case "ADD_CHAT":
      return { ...state, chats: uniqueById([action.payload, ...state.chats]) };
    
    case "UPDATE_CHAT":
      return {
        ...state,
        chats: state.chats.map(chat =>
          chat.chatId === action.payload.chatId
            ? { ...chat, ...action.payload }
            : chat
        )
      };
    
    case "REMOVE_CHAT":
      return {
        ...state,
        chats: state.chats.filter(chat => chat.chatId !== action.payload)
      };
    
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    
    default:
      return state;
  }
}

export function ChatsContextProvider({ children }) {
  const [state, dispatch] = useReducer(chatsReducer, {
    chats: [],
    loading: true,
    error: null,
  });

  const normalizeChat = async (chat, currentUserId) => {
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
      console.error("Error fetching chat participants:", error);
      return baseChat;
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const rawChats = await chatService.getAllChats();
        const currentUserId = authService.getCurrentUserId();

        const normalizedChats = await Promise.all(
          rawChats.map((chat) => normalizeChat(chat, currentUserId))
        );

        dispatch({ type: "SET_CHATS", payload: normalizedChats });
      } catch (error) {
        console.error('Error fetching chats:', error);
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchChats();
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  return (
    <ChatsContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatsContext.Provider>
  );
}
