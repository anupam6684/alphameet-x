import api from "@/lib/api";

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Refresh Access Token
export const refreshAccessToken = async () => {
  try {
    const response = await api.post("/auth/refresh");

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get Current User
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/user/profile");

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
