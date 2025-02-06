import React from "react";
import Header from "../components/layout/Header";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Welcome to Your Dashboard</h2>
        <p>Here you can manage your projects and collaborate with others.</p>
      </div>
    </div>
  );
};

export default Dashboard;
