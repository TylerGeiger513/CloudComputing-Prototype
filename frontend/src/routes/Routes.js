import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../components/forms/Login";
import Signup from "../components/forms/Signup";
import Dashboard from "../pages/Dashboard";
import { AuthContext } from "../context/authContext";
import Profile from "../pages/Profile";

const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={user ? <Dashboard /> : <Login/>} />
        <Route path="/signup" element={user ? <Dashboard /> : <Signup/>} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;