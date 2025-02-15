import React from "react";
import Header from "../components/layout/Header";
import FriendsCard from "../components/FriendsCard";
import "./Dashboard.css"; // Dashboard-specific CSS

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="dashboard-container">
        {/* Main content on the left */}
        <main className="dashboard-main">
          <h2>Welcome to Your Dashboard</h2>
          <p>
            Here you can manage your projects and collaborate with others.
          </p>
          {/* Additional components can be placed here */}
        </main>
        {/* FriendsCard on the right */}
        <FriendsCard />
      </div>
    </div>
  );
};

export default Dashboard;
