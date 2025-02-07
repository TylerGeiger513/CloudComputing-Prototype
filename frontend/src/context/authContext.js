import React, { createContext, useState, useEffect } from 'react';
import { 
  login as loginService, 
  signup as signupService, 
  getProfile as getUserProfileService, 
  logout as logoutService 
} from '../services/authService'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Function to fetch the user profile using cookies
  const fetchUserProfile = async () => {
    try {
      const data = await getUserProfileService();
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login function that logs in the user and then fetches the profile
  const loginUser = async (username, password) => {
    try {
      await loginService(username, password);
      await fetchUserProfile();
    } catch (error) {
      throw error;
    }
  };

  // Signup function that registers and then logs in the user
  const signupUser = async (username, email, password) => {
    try {
      await signupService(username, email, password);
      await fetchUserProfile(); // Auto-login after successful signup
    } catch (error) {
      throw error;
    }
  };

  // Logout function that clears the cookie-based session
  const logoutUser = async () => {
    try {
      await logoutService();
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // On component mount, try to fetch the user profile
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, signupUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
