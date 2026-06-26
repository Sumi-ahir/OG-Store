import {
  createProduct,
  getSellerProduct,
  getAllProduct,
  getProductDetails,
  deleteSellerProduct,
  updateProduct,
} from "../service/product.api";
import { useDispatch } from "react-redux";
import {
  setSellerProduct,
  setProduct,
  deleteProduct,
} from "../state/product.slice";
export const useProduct = () => {
  const dispatch = useDispatch();

  // create product
  async function handleCreateProduct(formData) {
    try {
      const data = await createProduct(formData);
      console.log(data);
      return data;
    } catch (error) {
      console.log("CREATE PRODUCT ERROR:", error);
      console.log("SERVER ERROR:", error?.response?.data);
      console.log(error?.response?.data?.message || error.message);
    }
  }
  //   get seller product
  async function handleGetSellerProduct() {
    try {
      const data = await getSellerProduct();

      console.log("SELLER API PRODUCT:", data.products);

      dispatch(setSellerProduct(data.products || []));
    } catch (error) {
      console.log(error);
    }
  }

  // get all product
  const handleGetAllProduct = async () => {
    try {
      const data = await getAllProduct();

      console.log("API RESPONSE:", data);

      dispatch(setProduct(data.product));

      console.log("PRODUCT ARRAY:", data.product);
    } catch (error) {
      console.log(error);
    }
  };

  //    product detail
  async function handleGetProductDetail(productId) {
    try {
      const data = await getProductDetails(productId);
      return data.product;
    } catch (error) {
      console.log(error?.message);
    }
  }

  //   delete seller product
  async function handleDeleteProduct(productId) {
    try {
      const data = await deleteSellerProduct(productId);
      dispatch(deleteProduct(productId)); // Redux state update
      console.log(data);

      return data;
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  }
  // update seller product
  async function handleUpdateProduct(productId, formData) {
    try {
      const data = await updateProduct(productId, formData);

      console.log("UPDATED PRODUCT:", data);

      // refresh seller products
      const sellerData = await getSellerProduct();

      dispatch(setSellerProduct(sellerData.products || []));

      return data;
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    }
  }

  return {
    handleCreateProduct,
    handleGetSellerProduct,
    handleGetAllProduct,
    handleGetProductDetail,
    handleDeleteProduct,
    handleUpdateProduct,
  };
};
