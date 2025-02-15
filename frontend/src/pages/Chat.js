import React from 'react';
import Header from "../components/layout/Header";

export default function Chat() {


  // Container for the entire page
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#2C2C2C',
    color: '#FFFFFF',
    fontFamily: 'sans-serif',
  };

  // Left sidebar
  const sidebarStyle = {
    width: '70px',
    backgroundColor: '#1E1E1E',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 0',
  };

  // Sidebar icons
  const sidebarIconStyle = {
    width: '40px',
    height: '40px',
    backgroundColor: '#333333',
    borderRadius: '8px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  // Main chat area (middle section)
  const mainChatAreaStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#2C2C2C',
    padding: '20px',
  };

  // Chat container inside the main area
  const chatContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  // Scrollable chat box where messages appear
  const chatBoxStyle = {
    flex: 1, // fills the remaining vertical space
    backgroundColor: '#1E1E1E',
    borderRadius: '8px',
    padding: '10px',
    overflowY: 'auto',
    marginBottom: '10px',
  };

  // Container for the chat input
  const chatInputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: '8px',
    padding: '10px',
  };

  // The text input field for typing messages
  const chatInputStyle = {
    flex: 1,
    backgroundColor: '#333333',
    border: 'none',
    borderRadius: '4px',
    color: '#FFFFFF',
    padding: '10px',
    marginRight: '10px',
    outline: 'none',
  };

  // The "Send" button
  const sendButtonStyle = {
    backgroundColor: '#555555',
    border: 'none',
    borderRadius: '4px',
    color: '#FFFFFF',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  // Right sidebar (user list)
  const userListContainerStyle = {
    width: '250px',
    backgroundColor: '#1E1E1E',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  };

  // Individual user item in the right sidebar
  const userItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333333',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    cursor: 'pointer',
  };

  // Style for the user's name in the right sidebar
  const userNameStyle = {
    marginRight: '10px',
  };

  // Reusable button style for "New Chat"
  const buttonStyle = {
    backgroundColor: '#555555',
    border: 'none',
    borderRadius: '4px',
    color: '#FFFFFF',
    padding: '5px 10px',
    cursor: 'pointer',
  };

  return (
    <>
    <Header />
    <div style={containerStyle}>
      {/* Left Sidebar */}
      <div style={sidebarStyle}>
        {/* Example "logo" or top icon */}
        <div style={sidebarIconStyle}>Logo</div>
        {/* Additional icons */}
        <div style={sidebarIconStyle}>1</div>
        <div style={sidebarIconStyle}>2</div>
        <div style={sidebarIconStyle}>3</div>
      </div>

      {/* Main Chat Area */}
      <div style={mainChatAreaStyle}>
        <h2>Chat Area</h2>
        <div style={chatContainerStyle}>
          {/* Scrollable Chat Box */}
          <div style={chatBoxStyle}>
            {/* Example chat messages (replace with dynamic content as needed) */}
            <div> hi (this is hardcoded in) </div>
          </div>

          {/* Chat Input Area */}
          <div style={chatInputContainerStyle}>
            <input 
              type="text" 
              placeholder="Type a message..." 
              style={chatInputStyle} 
            />
            <button style={sendButtonStyle}>Send</button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - User List */}
      <div style={userListContainerStyle}>
        <div style={userItemStyle}>
          <span style={userNameStyle}>Bob Smith</span>
          <button style={buttonStyle}>New Chat</button>
        </div>
        <div style={userItemStyle}>
          <span style={userNameStyle}>John Doe</span>
          <button style={buttonStyle}>New Chat</button>
        </div>
        <div style={userItemStyle}>
          <span style={userNameStyle}>Other Friend</span>
          <button style={buttonStyle}>New Chat</button>
        </div>
      </div>
    </div>
    </>
  );
}
