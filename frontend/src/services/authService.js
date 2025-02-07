import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Create an axios instance for all API calls
const axiosInstance = axios.create({
    baseURL: API_URL + "/auth",
    withCredentials: true,
});

// Handles API requests with detailed error logging and messaging
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
            throw new Error(
                "No response received from server. Please check your internet connection."
            );
        } else {
            console.error("Request Setup Error:", error.message);
            throw new Error(`Request error: ${error.message}`);
        }
    }
};

// LOGIN: Authenticates the user
export const login = async (username, password) => {
    return handleRequest(() =>
        axiosInstance.post("/login", { username, password })
    );
};

// SIGNUP: Registers a new user and logs them in
export const signup = async (username, email, password) => {
    return handleRequest(() =>
        axiosInstance.post("/signup", { username, email, password })
    );
};

// LOGOUT: Logs out the user
export const logout = async () => {
    return handleRequest(() =>
        axiosInstance.post("/logout")
    );
};

// GET PROFILE: Retrieves the user's profile
export const getProfile = async () => {
    return handleRequest(() =>
        axiosInstance.get("/profile")
    );
};