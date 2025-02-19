import React from "react";
import styles from "../../styles/FriendsCard.module.css";
import { ReactComponent as UserFriendsIcon } from "../../assets/images/user-friends.svg";
import { ReactComponent as CloseButtonIcon } from "../../assets/images/close-button.svg";

const FriendsCardHeader = ({ isCollapsed, setIsCollapsed }) => {
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={styles.friendHeader}>
      <button className={styles.toggleBtn} onClick={toggleSidebar} aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
        {isCollapsed ? (
          <UserFriendsIcon className={styles.toggleIcon} />
        ) : (
          <CloseButtonIcon className={styles.toggleIcon} />
        )}
      </button>
    </div>
  );
};

export default FriendsCardHeader;
