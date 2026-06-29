import axios from "axios";

const authApi = axios.create({
  // baseURL: "http://localhost:5000/api/auth",
     baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
  withCredentials: true,
});

// LOGIN
export const login = async (data) => {
  const res = await authApi.post("/login", data, { withCredentials: true });
  return res.data;
};

// REGISTER
export const register = async (data) => {
  const res = await authApi.post("/register", data, { withCredentials: true });
  return res.data;
};

// GET ME
export const getMe = async () => {
  const res = await authApi.get("/me");
  return res.data;
};
// LOGOUT
export const logout = async () => {
  const res = await authApi.post("/logout");
  return res.data;
};