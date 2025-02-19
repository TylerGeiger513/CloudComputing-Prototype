import React, { createContext, useState, useEffect } from "react";
import {
  login as loginService,
  signup as signupService,
  getProfile as getUserProfileService,
  logout as logoutService,
} from "../services/AuthService";
import { testUser } from "../mockData";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const useMock = process.env.REACT_APP_MOCK === "true";

  const fetchUserProfile = async () => {
    try {
      if (useMock) {
        setUser(testUser);
      } else {
        const data = await getUserProfileService();
        setUser(data.user || null);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (username, password) => {
    try {
      if (useMock) {
        setUser(testUser);
      } else {
        await loginService(username, password);
        await fetchUserProfile();
      }
    } catch (error) {
      throw error;
    }
  };

  const signupUser = async (username, email, password) => {
    try {
      if (useMock) {
        setUser(testUser);
      } else {
        await signupService(username, email, password);
        await fetchUserProfile();
      }
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      if (useMock) {
        setUser(null);
      } else {
        await logoutService();
        setUser(null);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, signupUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
