import axios from "axios";
import { testUser, mockFriendRequests } from "../mockData";

const API_URL = process.env.REACT_APP_API_URL;
const useMock = process.env.REACT_APP_MOCK === "true";

export const sendFriendRequest = async (recipient) => {
  if (useMock) {
    return Promise.resolve({ message: "Friend request sent successfully." });
  }
  const response = await axios.post(`${API_URL}/friends/request`, { recipient }, { withCredentials: true });
  return response.data;
};

export const getFriendRequests = async () => {
  if (useMock) {
    return Promise.resolve({ friendRequests: mockFriendRequests });
  }
  const response = await axios.get(`${API_URL}/friends/requests`, { withCredentials: true });
  return response.data;
};

export const acceptFriendRequest = async (requestId) => {
  if (useMock) {
    return Promise.resolve({ message: "Friend request accepted." });
  }
  const response = await axios.post(`${API_URL}/friends/accept`, { requestId }, { withCredentials: true });
  return response.data;
};

export const declineFriendRequest = async (requestId) => {
  if (useMock) {
    return Promise.resolve({ message: "Friend request declined." });
  }
  const response = await axios.post(`${API_URL}/friends/decline`, { requestId }, { withCredentials: true });
  return response.data;
};

export const revokeFriendRequest = async (requestId) => {
  if (useMock) {
    return Promise.resolve({ message: "Friend request revoked." });
  }
  const response = await axios.post(`${API_URL}/friends/revoke`, { requestId }, { withCredentials: true });
  return response.data;
};

export const getFriendList = async () => {
  if (useMock) {
    return Promise.resolve({ friends: testUser.friends });
  }
  const response = await axios.get(`${API_URL}/friends/list`, { withCredentials: true });
  return response.data;
};

export const removeFriend = async (friendId) => {
  if (useMock) {
    return Promise.resolve({ message: "Friend removed successfully." });
  }
  const response = await axios.post(`${API_URL}/friends/remove`, { friendId }, { withCredentials: true });
  return response.data;
};
