import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, getUserProfile as getUserProfileService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize token from localStorage (if available)
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  // Function to fetch the user profile given a token
  const fetchUserProfile = async (token) => {
    try {
      const profile = await getUserProfileService(token);
      setUser(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Login function that stores token and then fetches the user profile
  const loginUser = async (email, password) => {
    try {
      const data = await loginService(email, password);
      // Store token in localStorage and state
      localStorage.setItem('token', data.token);
      setUserToken(data.token);
      // Now that we have the token, fetch the user profile
      await fetchUserProfile(data.token);
    } catch (error) {
      throw error;
    }
  };

  // On component mount, if a token exists, try to fetch the user profile
  useEffect(() => {
    if (userToken) {
      fetchUserProfile(userToken);
    }
  }, [userToken]);

  return (
    <AuthContext.Provider value={{ user, userToken, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
