import React, { createContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../styles/themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  const setCSSVariables = (themeObject) => {
    const root = document.documentElement;
    Object.keys(themeObject).forEach(key => {
      root.style.setProperty(key, themeObject[key]);
    });
  };

  useEffect(() => {
    setCSSVariables(theme === 'dark' ? darkTheme : lightTheme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
