import { createContext, useReducer, useEffect } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext();

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload.userId,
        username: action.payload.username,
        token: action.payload.token,
      };
    
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
        username: null,
        token: null,
      };
    
    case "UPDATE_AUTH":
      return {
        ...state,
        ...action.payload,
      };
    
    default:
      return state;
  }
}

export function AuthContextProvider({ children }) {
  const initialState = {
    isAuthenticated: authService.isAuthenticated(),
    userId: authService.getCurrentUserId(),
    username: authService.getCurrentUsername(),
    token: localStorage.getItem('token'),
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = localStorage.getItem('token');
    if (token) {
      dispatch({
        type: "LOGIN",
        payload: {
          userId: authService.getCurrentUserId(),
          username: authService.getCurrentUsername(),
          token,
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
