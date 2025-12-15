import { createContext, useReducer } from "react";
import groups from "../Mock/Groups";


export const GroupsContext = createContext();

function groupReducer(state, action) {
        switch (action.type) {
                case "SET_GROUPS":
                        return { groups: action.payload };

                case "ADD_GROUP":
                        return { groups: [ action.payload, ...state.groups ] };

                case "REMOVE_GROUP":
                        return { groups:  state.groups.filter( group => group._id !== action.payload ) };

                default:
                        return state;

        }
}

export function GroupsContextProvider({ children }) {
        const [state, dispatch] = useReducer(groupReducer, { groups: groups });

        return (
                <GroupsContext.Provider value={{ state, dispatch }}>
                        {children}
                </GroupsContext.Provider>
        );
}