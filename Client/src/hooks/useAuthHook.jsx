import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "../services/authService";

function useAuthHook() {
  const { state, dispatch } = useContext(AuthContext);

  const login = async (usernameOrEmail, password) => {
    try {
      const response = await authService.login(usernameOrEmail, password);
      dispatch({
        type: "LOGIN",
        payload: {
          userId: response.userId,
          username: response.username,
          token: response.token,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, email, password, firstName, lastName) => {
    try {
      const response = await authService.register(username, email, password, firstName, lastName);
      dispatch({
        type: "LOGIN",
        payload: {
          userId: response.userId,
          username: response.username,
          token: response.token,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: "LOGOUT" });
  };

  return {
    isAuthenticated: state.isAuthenticated,
    userId: state.userId,
    username: state.username,
    token: state.token,
    login,
    register,
    logout,
  };
}

export default useAuthHook;
