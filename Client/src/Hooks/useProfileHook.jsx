import { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import { userService } from "../services/userService";

function useProfileHook() {
  const { state, dispatch } = useContext(ProfileContext);

  const setProfile = (profile) => {
    dispatch({ type: "SET_PROFILE", payload: profile });
  };

  const updateProfile = async (firstName, lastName, bio) => {
    try {
      const updatedProfile = await userService.updateProfile(firstName, lastName, bio);
      dispatch({ type: "UPDATE_PROFILE", payload: updatedProfile });
      return updatedProfile;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await userService.changePassword(currentPassword, newPassword);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const updateSettings = async (settings) => {
    try {
      const updatedSettings = await userService.updateUserSettings(settings);
      dispatch({ type: "SET_SETTINGS", payload: updatedSettings });
      return updatedSettings;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const refreshProfile = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const profile = await userService.getCurrentUser();
      dispatch({ type: "SET_PROFILE", payload: profile });
      return profile;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  return {
    profile: state.profile,
    settings: state.settings,
    loading: state.loading,
    error: state.error,
    setProfile,
    updateProfile,
    changePassword,
    updateSettings,
    refreshProfile,
  };
}

export default useProfileHook;
