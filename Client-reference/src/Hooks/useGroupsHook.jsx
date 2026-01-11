import { useContext } from "react";
import { GroupsContext } from "../Contexts/GroupsContext";


function useGroupsHook() {
        const { state, dispatch } = useContext(GroupsContext);
        const groups = state.groups;

        const setGroups = (groups) => (
                dispatch({type: "SET_GROUPS", payload: groups})
        );

        const addGroup = (groups) => (
                dispatch({type: "ADD_GROUP", payload: groups})
        );

        const removeGroup = (groups) => (
                dispatch({type: "REMOVE_GROUP", payload: groups})
        );

        return {
                groups,
                setGroups,
                addGroup,
                removeGroup
        };
}

export default useGroupsHook;