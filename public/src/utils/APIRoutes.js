// Base configuration
const BASE_HOST = process.env.REACT_APP_API_HOST || "http://localhost:5000";
const API_VERSION = "/api/v1"; // Versioning for future API changes

// Helper function to construct endpoints
const createEndpoint = (path) => `${BASE_HOST}${API_VERSION}${path}`;

// Auth Routes
export const authRoutes = {
  login: createEndpoint("/auth/login"),
  register: createEndpoint("/auth/register"),
  logout: createEndpoint("/auth/logout"),
  setAvatar: createEndpoint("/auth/setavatar"),
  allUsers: createEndpoint("/auth/allusers"),
  healthCheck: createEndpoint("/health"), // Health check endpoint
};

// Message Routes
export const messageRoutes = {
  send: createEndpoint("/messages/addmsg"),
  receive: createEndpoint("/messages/getmsg"),
  // Future message endpoints can be added here
};

// Utility function for handling API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status (4xx/5xx)
    console.error("API Error Response:", {
      status: error.response.status,
      data: error.response.data,
      headers: error.response.headers
    });
    return {
      status: false,
      message: error.response.data.message || "API request failed",
      code: error.response.status
    };
  } else if (error.request) {
    // No response received
    console.error("No Response Received:", error.request);
    return {
      status: false,
      message: "No response from server. Check your connection.",
      code: "NETWORK_ERROR"
    };
  } else {
    // Request setup error
    console.error("Request Setup Error:", error.message);
    return {
      status: false,
      message: "Request configuration error",
      code: "REQUEST_ERROR"
    };
  }
};

// For backward compatibility (keep your existing imports working)
export const host = BASE_HOST;
export const loginRoute = authRoutes.login;
export const registerRoute = authRoutes.register;
export const logoutRoute = authRoutes.logout;
export const allUsersRoute = authRoutes.allUsers;
export const sendMessageRoute = messageRoutes.send;
export const recieveMessageRoute = messageRoutes.receive;
export const setAvatarRoute = authRoutes.setAvatar;
export const healthCheckRoute = authRoutes.healthCheck;