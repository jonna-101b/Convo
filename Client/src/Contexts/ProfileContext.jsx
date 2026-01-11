import { createContext, useReducer, useEffect } from "react";
import { userService } from "../services/userService";

export const ProfileContext = createContext();

function profileReducer(state, action) {
  switch (action.type) {
    case "SET_PROFILE":
      return { ...state, profile: action.payload, loading: false };
    
    case "UPDATE_PROFILE":
      return { ...state, profile: { ...state.profile, ...action.payload } };
    
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    
    case "SET_SETTINGS":
      return { ...state, settings: action.payload };
    
    default:
      return state;
  }
}

export function ProfileContextProvider({ children }) {
  const [state, dispatch] = useReducer(profileReducer, {
    profile: null,
    settings: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const profile = await userService.getCurrentUser();
        dispatch({ type: "SET_PROFILE", payload: profile });
        
        // Fetch settings
        const settings = await userService.getUserSettings();
        dispatch({ type: "SET_SETTINGS", payload: settings });
      } catch (error) {
        console.error('Error fetching profile:', error);
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile();
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}
