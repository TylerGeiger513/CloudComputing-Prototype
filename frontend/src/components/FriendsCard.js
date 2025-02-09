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

const FriendsCard = () => {
  const [friendList, setFriendList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [newFriend, setNewFriend] = useState("");
  const [error, setError] = useState("");

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
    } catch (err) {
      console.error(err);
      setError("Failed to remove friend.");
    }
  };

  return (
    <div className={styles.card}>
      <h2>Friends</h2>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.section}>
        <h3>Friend List</h3>
        {friendList.length === 0 ? (
          <p>No friends yet.</p>
        ) : (
          <ul className={styles.friendList}>
            {friendList.map((friend) => (
              <li key={friend._id} className={styles.friendItem}>
                <span>
                  {friend.username} ({friend.email})
                </span>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemoveFriend(friend._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.section}>
        <h3>Friend Requests</h3>
        {friendRequests.length === 0 ? (
          <p>No pending friend requests.</p>
        ) : (
          <ul className={styles.requestList}>
            {friendRequests.map((request) => (
              <li key={request._id} className={styles.requestItem}>
                <span>
                  {request.requester.username} ({request.requester.email})
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

      <div className={styles.section}>
        <h3>Send Friend Request</h3>
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
  );
};

export default FriendsCard;
