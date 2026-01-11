import { useContext } from "react";
import { FriendsContext } from "../Contexts/FriendsContext";


function useFriendsHook() {
        const { state, dispatch } = useContext(FriendsContext);
        const friends = state.friends;

        const setFriends = (friends) => (
                dispatch({type: "SET_FRIENDS", payload: friends})
        );

        const addFriend = (friend) => (
                dispatch({type: "ADD_FRIEND", payload: friend})
        );

        const removeFriend = (friend) => (
                dispatch({type: "REMOVE_FRIEND", payload: friend})
        );

        return {
                friends,
                setFriends,
                addFriend,
                removeFriend
        };
}

export default useFriendsHook;