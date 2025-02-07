import React from "react";
import { AuthProvider } from "./context/authContext";
import Routes from "./routes/Routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
