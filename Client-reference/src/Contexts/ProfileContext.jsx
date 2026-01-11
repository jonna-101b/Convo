import { createContext, useReducer } from "react";
import profile from "../Mock/Profile";


export const ProfileContext = createContext();

function profileReducer(state, action) {
        switch (action.type) {
                case "SET_PROFILE":
                        return { profile: action.payload };

                case "ADD_PROFILE":
                        return { profile: [ action.payload, ...state.profile ] };

                case "REMOVE_PROFILE":
                        return { profile:  state.profile.filter( profile => profile._id !== action.payload ) };

                default:
                        return state;

        }
}

export function ProfileContextProvider({ children }) {
        const [state, dispatch] = useReducer(profileReducer, { profile: profile });

        return (
                <ProfileContext.Provider value={{ state, dispatch }}>
                        {children}
                </ProfileContext.Provider>
        );
}