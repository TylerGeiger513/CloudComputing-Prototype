// src/services/chatService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchOrCreateChannel = async (recipientId) => {
  const response = await axios.post(
    `${API_URL}/channels/direct`,
    { recipientId },
    { withCredentials: true }
  );
  return response.data.channel;
};

export const fetchMessages = async (channelId) => {
  const response = await axios.get(
    `${API_URL}/channels/${channelId}/messages`,
    { withCredentials: true }
  );
  return response.data.messages;
};

export const sendMessage = async ({ channelId, content }) => {
  const response = await axios.post(
    `${API_URL}/channels/message`,
    { channelId, content },
    { withCredentials: true }
  );
  return response.data.data; // assuming the created message is returned here
};
