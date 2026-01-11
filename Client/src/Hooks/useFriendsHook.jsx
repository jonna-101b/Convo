import { useContext } from "react";
import { FriendsContext } from "../contexts/FriendsContext";
import { friendService } from "../services/friendService";

function useFriendsHook() {
  const { state, dispatch } = useContext(FriendsContext);

  const sendFriendRequest = async (receiverId) => {
    try {
      const request = await friendService.sendFriendRequest(receiverId);
      dispatch({ type: "ADD_REQUEST", payload: request });
      return request;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      const chatId = await friendService.acceptFriendRequest(requestId);
      dispatch({ type: "REMOVE_REQUEST", payload: requestId });
      
      // Refresh friends list
      const friends = await friendService.getFriends();
      dispatch({ type: "SET_FRIENDS", payload: friends });
      
      return chatId;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const rejectFriendRequest = async (requestId) => {
    try {
      await friendService.rejectFriendRequest(requestId);
      dispatch({ type: "REMOVE_REQUEST", payload: requestId });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const cancelFriendRequest = async (requestId) => {
    try {
      await friendService.cancelFriendRequest(requestId);
      dispatch({ type: "REMOVE_REQUEST", payload: requestId });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const refreshFriends = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const friends = await friendService.getFriends();
      dispatch({ type: "SET_FRIENDS", payload: friends });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const refreshRequests = async () => {
    try {
      const requests = await friendService.getAllRequests();
      dispatch({ type: "SET_REQUESTS", payload: requests });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  return {
    friends: state.friends,
    requests: state.requests,
    loading: state.loading,
    error: state.error,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    cancelFriendRequest,
    refreshFriends,
    refreshRequests,
  };
}

export default useFriendsHook;
