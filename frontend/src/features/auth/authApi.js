import api from "../../utils/axios";

export const loginUserApi = async (data) => {
  console.log("authapi");
  const response = await api.post("/auth/login", data);
  console.log(response,"response from login");
  return response.data;
};

export const registerUserApi = async (data) => {
  const response = await api.post("/auth/register", data);
  console.log(response);
  return response.data;
};

// export const fetchUserProfileApi = async (data) =>{
//   const response = await api.get('/auth/me',data);
//   return response.data;
// }
