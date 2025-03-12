import axios from "axios";
import { PROD_BASE_URL, DEV_BASE_URL } from "../contants"

const axiosInstance = axios.create({
  baseURL: PROD_BASE_URL,
  // baseURL: DEV_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;
