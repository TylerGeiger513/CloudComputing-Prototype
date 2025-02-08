// frontend/src/App.js
import React from "react";
import { ThemeProvider } from "./context/themeContext";
import { AuthProvider } from "./context/authContext";
import Routes from "./routes/Routes";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
