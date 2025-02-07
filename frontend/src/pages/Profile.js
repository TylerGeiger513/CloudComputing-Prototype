import React from "react";
import Header from "../components/layout/Header";

const Profile = () => {
  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Your Profile</h2>
        <p>View and edit your personal information here.</p>
      </div>
    </div>
  );
};

export default Profile;
