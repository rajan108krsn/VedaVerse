import axiosInstance from "../../services/axiosInstance";

export const loginUserApi = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const registerUserApi = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);

  return response.data;
};

export const refreshTokenApi = async () => {
  const response = await axiosInstance.post("/auth/refresh-token", {}, { withCredentials: true });
  return response.data;
}