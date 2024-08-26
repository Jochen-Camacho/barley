import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN, GET_LOGGED_IN_USER } from "@/queries";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loginMutation] = useMutation(LOGIN);
  const authCheckPerformed = useRef(false);

  const {
    data: userData,
    refetch: refetchUser,
    error: userError,
  } = useQuery(GET_LOGGED_IN_USER, {
    skip: !isAuthenticated,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("barley-user");
      if (token && !authCheckPerformed.current) {
        try {
          await refetchUser();
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error validating token:", error);
          localStorage.removeItem("barley-user");
        }
      }
      setIsLoading(false);
      authCheckPerformed.current = true;
    };

    checkAuth();
  }, [refetchUser]);

  useEffect(() => {
    if (userData && userData.getLoggedInUser) {
      setUser(userData.getLoggedInUser);
    } else if (userError) {
      console.error("Error fetching user data:", userError);
      setIsAuthenticated(false);
      localStorage.removeItem("barley-user");
    }
  }, [userData, userError]);

  const login = useCallback(
    async (loginData) => {
      setIsLoading(true);
      try {
        const { data } = await loginMutation({ variables: { ...loginData } });
        const token = data.login.token;
        localStorage.setItem("barley-user", token);
        setIsAuthenticated(true);
        await refetchUser();
        return { success: true };
      } catch (error) {
        console.error("Login failed:", error);
        return { success: false, error: error.message };
      } finally {
        setIsLoading(false);
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
      try {
        await refetchUser();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [isAuthenticated, refetchUser]);

  useEffect(() => {
    console.log("Auth state changed:", {
      isAuthenticated,
      isLoading,
      user: user ? "User set" : "No user",
    });
  }, [isAuthenticated, isLoading, user]);

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    getUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
