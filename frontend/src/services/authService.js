import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL 

export const login = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, { email, password });
        const token = res.data.token;
        localStorage.setItem("token", token);
        return res.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};


export const signup = async (username, email, password) => {
    try {
        const res = await axios.post(`${API_URL}/auth/signup`, { username, email, password });
        return res.data;
    } catch (error) {
        throw error.response?.data?.message || "Signup failed";
    }
};

export const getUserProfile = async (token) => {
    if (!token) {
        throw new Error("No token provided");
    }
    try {
        const res = await axios.get(`${API_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch user profile";
    }
};


export const logout = () => {
    localStorage.removeItem("token");
};
