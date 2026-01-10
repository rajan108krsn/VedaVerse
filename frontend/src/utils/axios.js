import axios from "axios";
import { store } from "../app/store";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // refresh token cookie ke liye
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
