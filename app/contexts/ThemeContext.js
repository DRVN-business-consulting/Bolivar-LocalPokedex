
import React, { createContext, useContext, useState } from 'react';

const lightTheme = {
  background: 'white',
  text: '#000',
  card: '#f8f9fa',
  border: '#ccc',
  button: '#007bff',
  buttonText: '#fff',
};

const darkTheme = {
  background: 'black',
  text: '#fff',
  card: '#444',
  border: '#555',
  button: '#ff4081',
  buttonText: '#000',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
