import { useState, useEffect, useCallback, createContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_LOGGED_IN_USER, LOGIN } from "@/queries";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loginMutation] = useMutation(LOGIN);

  const { data: userData, refetch: refetchUser } = useQuery(
    GET_LOGGED_IN_USER,
    {
      skip: !isAuthenticated,
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    const token = localStorage.getItem("barley-user");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (userData && userData.getLoggedInUser) {
      setUser(userData.getLoggedInUser);
    }
  }, [userData]);

  const login = useCallback(
    async (loginData) => {
      try {
        const { data } = await loginMutation({
          variables: { ...loginData },
        });
        const token = data.login.token;
        localStorage.setItem("barley-user", token);
        setIsAuthenticated(true);
        await refetchUser(); // Fetch user data after successful login
        return { success: true };
      } catch (error) {
        console.error("Login failed:", error);
        return { success: false, error: error.message };
      }
    },
    [loginMutation, refetchUser]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("barley-user");
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const getUser = useCallback(async () => {
    if (isAuthenticated) {
      await refetchUser();
    }
  }, [isAuthenticated, refetchUser]);

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    getUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
