import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://production-api.com"
    : "http://127.0.0.1:3000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
