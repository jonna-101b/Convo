import { createContext, useReducer } from "react";
import friends from "../Mock/Friends";


export const FriendsContext = createContext();

function friendReducer(state, action) {
        switch (action.type) {
                case "SET_FRIENDS":
                        return { friends: action.payload };

                case "ADD_FRIEND":
                        return { friends: [ action.payload, ...state.friends ] };

                case "REMOVE_FRIEND":
                        return { friends:  state.friends.filter( friend => friend._id !== action.payload ) };

                default:
                        return state;

        }
}

export function FriendsContextProvider({ children }) {
        const [state, dispatch] = useReducer(friendReducer, { friends: friends });

        return (
                <FriendsContext.Provider value={{ state, dispatch }}>
                        {children}
                </FriendsContext.Provider>
        );
}