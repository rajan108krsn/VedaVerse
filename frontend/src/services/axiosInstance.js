import axios from "axios";
import { getToken, setToken, clearToken } from "./tokenService";
import { setAccessToken, logout } from "../features/auth/authSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true,
});

// Attach access token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh token on 401
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry &&!originalRequest.url.includes("/auth/login")) {
      originalRequest._retry = true;
      try {
        const baseURL =
          import.meta.env.VITE_API_URL || "http://localhost:8000/api";
        
        const res = await axios.post(
          `${baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        const newToken = res.data.data?.accessToken || res.data.accessToken;
        setToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
