// src/components/friends/FriendsComponent.jsx
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import FriendsCardHeader from "./FriendsCardHeader";
import AddFriendSection from "./AddFriendSection";
import FriendList from "./FriendList";
import FriendRequests from "./FriendRequests";
import ContextMenu from "./ContextMenu";
import {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendList,
  removeFriend,
} from "../../services/FriendService.js"; // Ensure filename/casing match
import styles from "../../styles/FriendsCard.module.css";
import defaultPFP from "../../assets/images/Default_pfp.jpg";

const FriendsComponent = ({ onSelectFriend }) => {
  const queryClient = useQueryClient();
  const [newFriend, setNewFriend] = useState("");
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    friend: null,
  });
  // Add isCollapsed state for sidebar toggling
  const [isCollapsed, setIsCollapsed] = useState(false);

  // useQuery calls using object syntax
  const {
    data: friendListData,
    isLoading: isFriendListLoading,
    error: friendListError,
  } = useQuery({
    queryKey: ["friendList"],
    queryFn: getFriendList,
    staleTime: 300000, // 5 minutes
  });

  const {
    data: friendRequestsData,
    isLoading: isFriendRequestsLoading,
    error: friendRequestsError,
  } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
    staleTime: 300000,
  });

  // Mutation for sending a friend request
  const mutationSendFriendRequest = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      setNewFriend("");
    },
    onError: (err) => {
      console.error("Failed to send friend request", err);
    },
  });

  // Mutation for accepting a friend request
  const mutationAcceptRequest = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendList"] });
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
    onError: (err) => {
      console.error("Failed to accept friend request", err);
    },
  });

  // Mutation for declining a friend request
  const mutationDeclineRequest = useMutation({
    mutationFn: declineFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
    onError: (err) => {
      console.error("Failed to decline friend request", err);
    },
  });

  // Mutation for removing a friend
  const mutationRemoveFriend = useMutation({
    mutationFn: removeFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendList"] });
    },
    onError: (err) => {
      console.error("Failed to remove friend", err);
    },
  });

  // Handlers for button actions
  const handleSendRequest = () => {
    if (!newFriend.trim()) return;
    mutationSendFriendRequest.mutate(newFriend);
  };

  const handleAcceptRequest = (requestId) => {
    mutationAcceptRequest.mutate(requestId);
  };

  const handleDeclineRequest = (requestId) => {
    mutationDeclineRequest.mutate(requestId);
  };

  const handleRemoveFriend = (friendId) => {
    mutationRemoveFriend.mutate(friendId);
    setContextMenu({ visible: false, x: 0, y: 0, friend: null });
  };

  const handleContextMenu = (e, friend) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.pageX, y: e.pageY, friend });
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
      <FriendsCardHeader isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={styles.content}>
        <AddFriendSection
          newFriend={newFriend}
          setNewFriend={setNewFriend}
          handleSendRequest={handleSendRequest}
        />
        <div className={styles.sectionDivider} />
        {isFriendListLoading ? (
          <p>Loading friends...</p>
        ) : friendListError ? (
          <p>Error loading friends.</p>
        ) : (
          <FriendList
            friendList={friendListData?.friends || []}
            defaultPFP={defaultPFP}
            handleContextMenu={handleContextMenu}
            onSelectFriend={onSelectFriend}  
          />
        )}
        <div className={styles.sectionDivider} />
        {isFriendRequestsLoading ? (
          <p>Loading friend requests...</p>
        ) : friendRequestsError ? (
          <p>Error loading friend requests.</p>
        ) : (
          <FriendRequests
            friendRequests={friendRequestsData?.friendRequests || []}
            handleAcceptRequest={handleAcceptRequest}
            handleDeclineRequest={handleDeclineRequest}
          />
        )}
      </div>
      {contextMenu.visible && (
        <ContextMenu contextMenu={contextMenu} handleRemoveFriend={handleRemoveFriend} />
      )}
    </div>
  );
};

export default FriendsComponent;
