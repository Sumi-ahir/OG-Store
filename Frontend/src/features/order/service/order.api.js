import axios from "axios";

const orderApi = axios.create({
  // baseURL: "http://localhost:5000/api/order",
    baseURL: `${import.meta.env.VITE_API_URL}/api/order`,
  withCredentials: true,
});

export const createOrder = async (data) => {
  const res = await orderApi.post("/createOrder", data);
  return res.data;
};
// get seller order
export const getSellerOrder = async () => {
  const res = await orderApi.get("/sellerOrder");
  return res.data;
};
