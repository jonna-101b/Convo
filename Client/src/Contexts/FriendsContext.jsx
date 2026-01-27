import { createContext, useReducer, useEffect } from "react";
import { friendService } from "../services/friendService";

export const FriendsContext = createContext();

function friendsReducer(state, action) {
  const uniqueById = (list) => {
    const seen = new Set();
    const result = [];
    for (const item of list) {
      if (!item?.id || seen.has(item.id)) continue;
      seen.add(item.id);
      result.push(item);
    }
    return result;
  };

  switch (action.type) {
    case "SET_FRIENDS":
      return { ...state, friends: uniqueById(action.payload), loading: false };
    
    case "ADD_FRIEND":
      return { ...state, friends: uniqueById([action.payload, ...state.friends]) };
    
    case "REMOVE_FRIEND":
      return {
        ...state,
        friends: state.friends.filter(friend => friend.id !== action.payload)
      };
    
    case "SET_REQUESTS":
      return { ...state, requests: uniqueById(action.payload) };
    
    case "ADD_REQUEST":
      return { ...state, requests: uniqueById([action.payload, ...state.requests]) };
    
    case "REMOVE_REQUEST":
      return {
        ...state,
        requests: state.requests.filter(req => req.id !== action.payload)
      };
    
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    
    default:
      return state;
  }
}

export function FriendsContextProvider({ children }) {
  const [state, dispatch] = useReducer(friendsReducer, {
    friends: [],
    requests: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        
        const [friends, requests] = await Promise.all([
          friendService.getFriends(),
          friendService.getAllRequests(),
        ]);
        
        dispatch({ type: "SET_FRIENDS", payload: friends });
        dispatch({ type: "SET_REQUESTS", payload: requests });
      } catch (error) {
        console.error('Error fetching friends:', error);
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchFriends();
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  return (
    <FriendsContext.Provider value={{ state, dispatch }}>
      {children}
    </FriendsContext.Provider>
  );
}
