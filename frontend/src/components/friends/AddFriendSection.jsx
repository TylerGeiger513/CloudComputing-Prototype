import React from "react";
import styles from "../../styles/FriendsCard.module.css";

const AddFriendSection = ({ newFriend, setNewFriend, handleSendRequest }) => {
  return (
    <div className={styles.section}>
      <h3>Add Friend</h3>
      <div className={styles.addFriend}>
        <input
          type="text"
          placeholder="Enter Username or ID"
          value={newFriend}
          onChange={(e) => setNewFriend(e.target.value)}
          className={styles.input}
        />
        <button className={styles.sendBtn} onClick={handleSendRequest}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AddFriendSection;
