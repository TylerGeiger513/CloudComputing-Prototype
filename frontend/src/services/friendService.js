import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const sendFriendRequest = async (recipient) => {
  const response = await axios.post(
    `${API_URL}/friends/request`,
    { recipient },
    { withCredentials: true }
  );
  return response.data;
};

export const getFriendRequests = async () => {
  const response = await axios.get(
    `${API_URL}/friends/requests`,
    { withCredentials: true }
  );
  return response.data;
};

export const acceptFriendRequest = async (requestId) => {
  const response = await axios.post(
    `${API_URL}/friends/accept`,
    { requestId },
    { withCredentials: true }
  );
  return response.data;
};

export const declineFriendRequest = async (requestId) => {
  const response = await axios.post(
    `${API_URL}/friends/decline`,
    { requestId },
    { withCredentials: true }
  );
  return response.data;
};

export const revokeFriendRequest = async (requestId) => {
  const response = await axios.post(
    `${API_URL}/friends/revoke`,
    { requestId },
    { withCredentials: true }
  );
  return response.data;
};

export const getFriendList = async () => {
  const response = await axios.get(
    `${API_URL}/friends/list`,
    { withCredentials: true }
  );
  return response.data;
};

export const removeFriend = async (friendId) => {
  const response = await axios.post(
    `${API_URL}/friends/remove`,
    { friendId },
    { withCredentials: true }
  );
  return response.data;
};
