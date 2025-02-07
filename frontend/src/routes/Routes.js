import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../components/forms/Login";
import Signup from "../components/forms/Signup";
import Profile from "../pages/Profile"
import Dashboard from "../pages/Dashboard";
import { AuthContext } from "../context/authContext";

const AppRoutes = () => {
  const { userToken } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={userToken ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
