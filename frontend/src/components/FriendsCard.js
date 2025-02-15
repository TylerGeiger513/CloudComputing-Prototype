import React, { useState, useEffect } from "react";
import {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendList,
  removeFriend,
} from "../services/friendService";
import styles from "./FriendsCard.module.css";
import defaultPFP from "../styles/images/Default_pfp.jpg";

const FriendsCard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [newFriend, setNewFriend] = useState("");
  const [error, setError] = useState("");

  // State for the context menu on friend cards
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    friend: null,
  });

  const fetchFriends = async () => {
    try {
      const data = await getFriendList();
      setFriendList(data.friends || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch friend list.");
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const data = await getFriendRequests();
      setFriendRequests(data.friendRequests || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch friend requests.");
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchFriendRequests();
  }, []);

  const handleSendRequest = async () => {
    try {
      if (!newFriend.trim()) {
        setError("Please enter a valid friend username or ID.");
        return;
      }
      await sendFriendRequest(newFriend);
      setNewFriend("");
      fetchFriendRequests();
    } catch (err) {
      console.error(err);
      setError("Failed to send friend request.");
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await acceptFriendRequest(requestId);
      fetchFriends();
      fetchFriendRequests();
    } catch (err) {
      console.error(err);
      setError("Failed to accept friend request.");
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      await declineFriendRequest(requestId);
      fetchFriendRequests();
    } catch (err) {
      console.error(err);
      setError("Failed to decline friend request.");
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend(friendId);
      fetchFriends();
      // Close context menu after removal
      setContextMenu({ visible: false, x: 0, y: 0, friend: null });
    } catch (err) {
      console.error(err);
      setError("Failed to remove friend.");
    }
  };

  const handleContextMenu = (e, friend) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      friend,
    });
  };

  const handleCloseContextMenu = () => {
    if (contextMenu.visible) {
      setContextMenu({ visible: false, x: 0, y: 0, friend: null });
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseContextMenu);
    return () => window.removeEventListener("click", handleCloseContextMenu);
  }, [contextMenu]);

  return (
    <div className={`${styles.sideNav} ${isCollapsed ? styles.collapsed : ""}`}>
      <div className={styles.header}>
        <button
          className={styles.toggleBtn}
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "→" : "←"}
        </button>
        {!isCollapsed && <h2 className={styles.title}>Friends</h2>}
      </div>

      {!isCollapsed && (
        <div className={styles.content}>
          {error && <p className={styles.error}>{error}</p>}

          {/* Add Friend Section */}
          <div className={styles.section}>
            <h3>Add Friend</h3>
            <div className={styles.addFriend}>
              <input
                type="text"
                placeholder="Enter Friend Username or ID"
                value={newFriend}
                onChange={(e) => setNewFriend(e.target.value)}
                className={styles.input}
              />
              <button className={styles.sendBtn} onClick={handleSendRequest}>
                Send Request
              </button>
            </div>
          </div>
          <div className={styles.sectionDivider} />

          {/* Friend List Section */}
          <div className={styles.section}>
            <h3>Your Friends</h3>
            {friendList.length === 0 ? (
              <p>No friends yet.</p>
            ) : (
              <div className={styles.friendList}>
                {friendList.map((friend) => (
                  <div
                    key={friend._id}
                    className={styles.friendCard}
                    onContextMenu={(e) => handleContextMenu(e, friend)}
                  >
                    <img
                      src={defaultPFP}
                      alt="profile"
                      className={styles.profilePic}
                    />
                    <span className={styles.friendName}>
                      {friend.username}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.sectionDivider} />

          {/* Friend Requests Section */}
          <div className={styles.section}>
            <h3>Friend Requests</h3>
            {friendRequests.length === 0 ? (
              <p>No pending friend requests.</p>
            ) : (
              <ul className={styles.requestList}>
                {friendRequests.map((request) => (
                  <li key={request._id} className={styles.requestItem}>
                    <span>
                      {request.requester.username} (
                      {request.requester.email})
                    </span>
                    <div className={styles.requestBtns}>
                      <button
                        className={styles.acceptBtn}
                        onClick={() => handleAcceptRequest(request._id)}
                      >
                        Accept
                      </button>
                      <button
                        className={styles.declineBtn}
                        onClick={() => handleDeclineRequest(request._id)}
                      >
                        Decline
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu.visible && (
        <div
          className={styles.contextMenu}
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <ul>
            <li onClick={() => handleRemoveFriend(contextMenu.friend._id)}>
              Remove Friend
            </li>
            <li onClick={() => {}}>Block</li>
            <li onClick={() => {}}>View Profile</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FriendsCard;