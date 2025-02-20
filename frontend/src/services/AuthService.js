import axios from "axios";
import { testUser } from "../mockData";

const API_URL = process.env.REACT_APP_API_URL;
const useMock = process.env.REACT_APP_MOCK === "true";

const axiosInstance = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true,
});

const handleRequest = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
      const message =
        error.response.data.message ||
        `Server returned status ${error.response.status}`;
      throw new Error(`Error ${error.response.status}: ${message}`);
    } else if (error.request) {
      console.error("No Response Received:", error.request);
      throw new Error("No response received from server. Please check your internet connection.");
    } else {
      console.error("Request Setup Error:", error.message);
      throw new Error(`Request error: ${error.message}`);
    }
  }
};

export const login = async (username, password) => {
  if (useMock) {
    return Promise.resolve({ message: "Logged in successfully" });
  }
  return handleRequest(() =>
    axiosInstance.post("/login", { username, password })
  );
};

export const signup = async (username, email, password) => {
  if (useMock) {
    return Promise.resolve({ message: "User created successfully", userId: testUser._id });
  }
  return handleRequest(() =>
    axiosInstance.post("/signup", { username, email, password })
  );
};

export const logout = async () => {
  if (useMock) {
    return Promise.resolve({ message: "Logged out successfully" });
  }
  return handleRequest(() => axiosInstance.post("/logout"));
};

export const getProfile = async () => {
  if (useMock) {
    return Promise.resolve({ user: testUser });
  }
  return handleRequest(() => axiosInstance.get("/profile"));
};
