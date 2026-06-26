import axios from "axios";

const productApi = axios.create({
  baseURL: "http://localhost:5000/api/product",
  withCredentials: true,
});

// create product
export async function createProduct(formdata) {
  const response = await productApi.post("/", formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

// get seller product
export async function getSellerProduct() {
  const response = await productApi.get("/seller");

  return response.data;
}

// get all product
export async function getAllProduct() {
  const res = await productApi.get("/");

  return res.data;
}

// product detail
export async function getProductDetails(productId) {
  const response = await productApi.get(`/detail/${productId}`);

  return response.data;
}

// delete product
export async function deleteSellerProduct(productId) {
  const response = await productApi.delete(`/${productId}`);

  return response.data;
}

// update product
export async function updateProduct(productId, formData) {
  const response = await productApi.put(`/update/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
