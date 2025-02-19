import React from "react";
import styles from "../../styles/FriendsCard.module.css";
import { ReactComponent as ThreeDotsIcon } from "../../assets/images/three-dots-vertical.svg";

const FriendCard = ({ friend, defaultPFP, handleContextMenu }) => {
  const handleButtonClick = (e) => {
    e.stopPropagation();
    handleContextMenu(e, friend);
  };

  return (
    <div className={styles.friendCard} onContextMenu={(e) => handleContextMenu(e, friend)}>
      <img src={defaultPFP} alt="profile" className={styles.profilePic} />
      <div className={styles.friendInfo}>
        <span className={styles.friendName}>{friend.username}</span>
      </div>
      <button className={styles.threeDotsBtn} onClick={handleButtonClick}>
        <ThreeDotsIcon className={styles.threeDotsIcon} />
      </button>
    </div>
  );
};

export default FriendCard;
