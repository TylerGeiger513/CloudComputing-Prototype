import React from "react";
import Header from "../components/layout/Header";
import FriendsComponent from "../components/friends/FriendsComponent";
import ChatBox from "../components/chat/ChatBoxComponent";
import "../styles/Dashboard.css";


const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-left">
          <div>Logo</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <main className="dashboard-main">
          <ChatBox />
        </main>
        <aside className="dashboard-friends">
          <FriendsComponent />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
