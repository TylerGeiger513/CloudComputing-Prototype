// frontend/src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../styles/themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Store the current theme ('light' or 'dark')
  const [theme, setTheme] = useState('light');

  // A helper function to update CSS variables on the root element.
  const setCSSVariables = (themeObject) => {
    const root = document.documentElement;
    Object.keys(themeObject).forEach(key => {
      root.style.setProperty(key, themeObject[key]);
    });
  };

  // Update CSS variables when the theme changes.
  useEffect(() => {
    if (theme === 'dark') {
      setCSSVariables(darkTheme);
    } else {
      setCSSVariables(lightTheme);
    }
  }, [theme]);

  // Toggle between light and dark themes.
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
