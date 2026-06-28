import axios from "axios";

const cartApiInstance = axios.create({
  // baseURL: "http://localhost:5000/api/cart",
    baseURL: `${import.meta.env.VITE_API_URL}/api/cart`,
  withCredentials: true,
});

export const addItemToCart = async (productId) => {
  if (!productId) throw new Error("productId missing");
  const response = await cartApiInstance.post(`/add/${productId}`, { qty: 1 });

  return response.data;
};

export const getCart = async () => {
  const response = await cartApiInstance.get("/");
  console.log("API RESPONSE", response.data);
  return response.data;
};
