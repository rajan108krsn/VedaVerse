import axios from "axios";
import store from "../app/store";
import { setAccessToken, logout } from "../features/auth/authSlice";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// attach access token
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// refresh on 401
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        store.dispatch(setAccessToken(res.data.accessToken));

        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
