"use client";

import { getCurrentUser } from "@/services/auth.services";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { toast } from "react-toastify";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [meeting, setMeeting] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // 1. Sync React state & localStorage
  // const updateToken = useCallback((newToken) => {
  //   console.log(newToken, "on updateToken in appContext");
  //   setToken(newToken);
  //   if (newToken) {
  //     localStorage.setItem("accesstoken", newToken);
  //     setIsLoggedIn(true);
  //   } else {
  //     localStorage.removeItem("accesstoken");
  //     setIsLoggedIn(false);
  //     setUser(null);
  //   }
  // }, []);
  const updateToken = useCallback((newToken) => {
    console.log("🔑 updateToken called:", newToken);

    if (newToken === null) {
      console.trace("🚨 WHO CALLED updateToken(null)?");
    }

    setToken(newToken);

    if (newToken) {
      localStorage.setItem("accesstoken", newToken);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("accesstoken");
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);
  // 2. Fetch authenticated user data from backend
  // const fetchUserData = useCallback(async () => {
  //   try {
  //     const response = await getCurrentUser();

  //     // Adjust based on your API response structure (e.g. response.data or response.user)
  //     const userData = response?.user || response?.data?.user || response?.data;

  //     if (userData) {
  //       setUser(userData);
  //       setIsLoggedIn(true);
  //     } else {
  //       updateToken(null);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch user data:", error);
  //     updateToken(null);
  //   } finally {
  //     setIsAuthLoading(false);
  //   }
  // }, [updateToken]);

  const fetchUserData = useCallback(async () => {
    try {
      console.log("🔵 fetchUserData started");

      const response = await getCurrentUser();

      console.log("🟢 getCurrentUser response:", response);

      const userData =
        response?.user || response?.data?.user || response?.data || response;

      console.log("👤 userData:", userData);

      if (userData) {
        console.log("✅ User found, keeping token");

        setUser(userData);
        setIsLoggedIn(true);
      } else {
        console.log("🚨 No userData → removing token");
        updateToken(null);
      }
    } catch (error) {
      console.error("🚨 getCurrentUser failed:", error);
      updateToken(null);
    } finally {
      setIsAuthLoading(false);
    }
  }, [updateToken]);

  // 3. Initial Boot: Check localStorage and load session
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("accesstoken");
      if (savedToken) {
        setToken(savedToken);
        setIsLoggedIn(true);
      } else {
        setIsAuthLoading(false);
      }
    } catch (err) {
      console.error("Could not access localStorage:", err);
      setIsAuthLoading(false);
    }
  }, []);

  // 4. Trigger user profile fetch whenever token is populated
  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token, fetchUserData]);

  // 5. Complete Logout Helper
  const logout = useCallback(() => {
    setUser(null);
    setMeeting(null);
    updateToken(null);
    toast.info("Logged out successfully");
  }, [updateToken]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,

        token,
        setToken: updateToken,

        isLoggedIn,
        setIsLoggedIn,

        meeting,
        setMeeting,

        isAuthLoading,
        logout,
        refetchUser: fetchUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an <AppProvider>");
  }
  return context;
}
