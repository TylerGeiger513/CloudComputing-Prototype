// src/pages/Dashboard.jsx
import React, { useState } from "react";
import Header from "../components/layout/Header";
import FriendsComponent from "../components/friends/FriendsComponent";
import ChatBox from "../components/chat/ChatBoxComponent";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);

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
          {selectedFriend ? (
            <ChatBox friend={selectedFriend} />
          ) : (
            <div>Please select a friend to chat with.</div>
          )}
        </main>
        <aside className="dashboard-friends">
          <FriendsComponent onSelectFriend={setSelectedFriend} />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
