import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/layout/Header";

const Profile = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Profile Page</h2>
        <p>Username: {user?.username || "N/A"}</p>
        <p>Email: {user?.email || "N/A"}</p>
        <button
          onClick={logoutUser}
          style={{
            backgroundColor: "#6a0dad",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            marginTop: "20px",
            marginRight: "10px"
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#530c9b")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#6a0dad")}
        >
          Logout
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            backgroundColor: "#008080",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            marginTop: "20px"
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#006666")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#008080")}
        >
          Return to Dashboard
        </button>
      </div>
    </>
  );
};

export default Profile;
