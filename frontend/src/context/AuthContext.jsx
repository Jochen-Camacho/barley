import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN, GET_LOGGED_IN_USER_ID, GET_LOGGED_IN_USER } from "@/queries";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loginMutation] = useMutation(LOGIN);
  const authCheckPerformed = useRef(false);

  const {
    data: userIdData,
    refetch: refetchUserId,
    error: userIdError,
  } = useQuery(GET_LOGGED_IN_USER_ID, {
    skip: !isAuthenticated,
    fetchPolicy: "network-only",
  });

  const {
    data: userData,
    refetch: refetchUser,
    error: userError,
  } = useQuery(GET_LOGGED_IN_USER, {
    skip: !userIdData?.getLoggedInUserId?.id,
    fetchPolicy: "network-only",
    variables: { id: userIdData?.getLoggedInUserId?.id },
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("barley-user");
      if (token) {
        try {
          // Perform a request to validate the token
          await refetchUserId(); // Ensure this does not fail silently
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token validation failed:", error);
          localStorage.removeItem("barley-user");
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
      authCheckPerformed.current = true;
    };

    checkAuth();
  }, [refetchUserId]);

  useEffect(() => {
    if (userIdData && userIdData.getLoggedInUserId) {
      refetchUser(); // Fetch the user data based on the ID
    } else if (userIdError) {
      console.error("Error fetching user ID:", userIdError);
      setIsAuthenticated(false);
      localStorage.removeItem("barley-user");
    }
  }, [userIdData, userIdError, refetchUser]);

  useEffect(() => {
    if (userData && userData.employee_by_pk) {
      setUser(userData.employee_by_pk);
    } else if (userError) {
      console.error("Error fetching user data:", userError);
      setIsAuthenticated(false);
      localStorage.removeItem("barley-user");
    }
    setIsLoading(false);
  }, [userData, userError]);

  const login = useCallback(
    async (loginData) => {
      setIsLoading(true);
      try {
        const { data } = await loginMutation({ variables: { ...loginData } });
        const token = data.login.token;
        localStorage.setItem("barley-user", token);
        setIsAuthenticated(true);
        await refetchUserId(); // Ensure user ID is fetched
        return { success: true };
      } catch (error) {
        console.error("Login failed:", error);
        return { success: false, error: error.message };
      } finally {
        setIsLoading(false);
      }
    },
    [loginMutation, refetchUserId]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("barley-user");
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const getUser = useCallback(async () => {
    if (isAuthenticated && userIdData?.getLoggedInUserId?.id) {
      try {
        console.log("Refetching...");
        await refetchUser();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [isAuthenticated, userIdData, refetchUser]);

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
