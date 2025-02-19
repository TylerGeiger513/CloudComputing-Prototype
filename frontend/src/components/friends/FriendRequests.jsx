import React from "react";
import styles from "../../styles/FriendsCard.module.css";
import defaultPFP from "../../assets/images/Default_pfp.jpg";
import { ReactComponent as CheckIcon } from "../../assets/images/check.svg";
import { ReactComponent as CloseButtonIcon } from "../../assets/images/close-button.svg";

const FriendRequests = ({ friendRequests, handleAcceptRequest, handleDeclineRequest }) => {
  return (
    <div className={styles.section}>
      <h3>Friend Requests</h3>
      {friendRequests.length === 0 ? (
        <p>No pending friend requests.</p>
      ) : (
        <div className={styles.friendList}>
          {friendRequests.map((request) => (
            <div key={request._id} className={styles.friendCard}>
              <img src={defaultPFP} alt="profile" className={styles.profilePic} />
              <div className={styles.friendInfo}>
                <span className={styles.friendName}>{request.requester.username}</span>
              </div>
              <div className={styles.requestBtns}>
                <button className={styles.acceptBtn} onClick={() => handleAcceptRequest(request._id)}>
                  <CheckIcon className={styles.buttonIcon} />
                </button>
                <button className={styles.declineBtn} onClick={() => handleDeclineRequest(request._id)}>
                  <CloseButtonIcon className={styles.buttonIcon} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequests;
