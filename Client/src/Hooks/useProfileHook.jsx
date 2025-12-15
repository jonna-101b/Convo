import { useContext } from "react";
import { ProfileContext } from "../Contexts/ProfileContext";


function useProfileHook() {
        const { state, dispatch } = useContext(ProfileContext);
        const profile = state.profile;

        const setProfile = (profile) => (
                dispatch({type: "SET_PROFILE", payload: profile})
        );

        const addProfile = (profile) => (
                dispatch({type: "ADD_PROFILE", payload: profile})
        );

        const removeProfile = (profile) => (
                dispatch({type: "REMOVE_PROFILE", payload: profile})
        );

        return {
                profile,
                setProfile,
                addProfile,
                removeProfile
        };
}

export default useProfileHook;