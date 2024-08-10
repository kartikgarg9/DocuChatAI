import axios from "axios";

// Create an instance of axios with the token
const api = axios.create({
  baseURL: "http://localhost:3000", // Adjust the base URL as needed
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("firebaseToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
