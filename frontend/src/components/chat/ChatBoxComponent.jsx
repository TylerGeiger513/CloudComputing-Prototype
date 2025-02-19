// src/components/chat/ChatBoxComponent.jsx
import React, { useState } from "react";
import styles from "../../styles/ChatBox.module.css";
import { useChatChannel } from "../../hooks/useChatChannel";

const ChatBox = ({ friend }) => {
  const {
    channel,
    messages,
    messagesLoading,
    sendMessage,
    channelLoading,
  } = useChatChannel(friend._id);

  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  // Helper function to format a timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    // Check if date is today
    const isToday = date.toDateString() === now.toDateString();

    // Check if date is yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    let dayPart = "";
    if (isToday) {
      dayPart = "Today";
    } else if (isYesterday) {
      dayPart = "Yesterday";
    } else {
      dayPart = date.toLocaleDateString();
    }

    // Format time as hh:mm AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;

    return `${dayPart} @ ${hours}:${minutesStr} ${ampm}`;
  };

  if (channelLoading) return <div>Loading chat...</div>;

  return (
    <div className={styles.chatBox}>
      <div className={styles.chatHeader}>Chat with {friend.username}</div>
      <div className={styles.chatMessages}>
        {messagesLoading ? (
          <div>Loading messages...</div>
        ) : (
          messages &&
          messages.map((msg) => {
            const isFriendMessage = msg.sender === friend._id;
            const containerClass = isFriendMessage
              ? styles.friendContainer
              : styles.youContainer;
            return (
              <div key={msg._id} className={containerClass}>
                <div className={styles.messageBubble}>{msg.content}</div>
                <div className={styles.messageInfo}>
                  <span className={styles.senderName}>
                    {isFriendMessage ? friend.username : "You"}
                  </span>
                  <span>{formatTimestamp(msg.createdAt)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
      <form className={styles.chatInputContainer} onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className={styles.chatInput}
        />
        <button type="submit" className={styles.sendButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
