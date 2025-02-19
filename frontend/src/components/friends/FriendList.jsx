import React from "react";
import styles from "../../styles/FriendsCard.module.css";
import FriendCard from "./FriendCard";

const FriendList = ({ friendList, defaultPFP, handleContextMenu }) => {
  return (
    <div className={styles.section}>
      <h3>Your Friends</h3>
      {friendList.length === 0 ? (
        <p>No friends yet.</p>
      ) : (
        <div className={styles.friendList}>
          {friendList.map((friend) => (
            <FriendCard
              key={friend._id}
              friend={friend}
              defaultPFP={defaultPFP}
              handleContextMenu={handleContextMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendList;
