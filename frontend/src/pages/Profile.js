import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import { getUserProfile } from "../services/authService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User is not authenticated");
        return;
      }

      try {
        const userData = await getUserProfile(token);
        setUser(userData);
      } catch (err) {
        setError(err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Your Profile</h2>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : user === null ? (
          <p>Loading...</p> // Display while data is being fetched
        ) : (
          <div>
            <p><strong>Username:</strong> {user?.username}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
