import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN, GET_LOGGED_IN_USER } from "@/queries";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("Authenticated")
  );
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
      try {
        if (token) {
          try {
            await refetchUser();
            setIsAuthenticated(true);
          } catch (error) {
            console.error("Token validation failed:", error);
            localStorage.removeItem("barley-user");
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

      authCheckPerformed.current = true;
    };

    checkAuth();
  }, [refetchUser]);

  useEffect(() => {
    try {
      if (userData && userData.getLoggedInUser) {
        setUser(userData.getLoggedInUser);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userData, userError]);

  useEffect(() => {
    sessionStorage.setItem("Authenticated", isAuthenticated);
  }, [isAuthenticated]);

  const login = useCallback(
    async (loginData) => {
      setIsLoading(true);
      try {
        const { data } = await loginMutation({ variables: { ...loginData } });
        const token = data.login.token;
        console.log(token);
        localStorage.setItem("barley-user", token);
        setIsAuthenticated(true);
        await refetchUser();
        console.log("Fetech Successful");
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
        console.log("Refetching...");
        await refetchUser();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [isAuthenticated, refetchUser]);

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
