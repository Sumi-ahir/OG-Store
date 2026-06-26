import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProducts: [],
    products: [],
    editProduct: null,
  },

  reducers: {
    setSellerProduct(state, action) {
      state.sellerProducts = action.payload;
    },

    addSellerProduct(state, action) {
      state.sellerProducts.push(action.payload);
    },

    deleteProduct(state, action) {
      state.sellerProducts = state.sellerProducts.filter(
        (product) => product._id !== action.payload,
      );

      state.products = state.products.filter(
        (product) => product._id !== action.payload,
      );
    },

    setEditProduct(state, action) {
      state.editProduct = action.payload;
    },

    clearEditProduct(state) {
      state.editProduct = null;
    },

    clearSellerProducts(state) {
      state.sellerProducts = [];
    },
    setProduct: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  setSellerProduct,
  addSellerProduct,
  deleteProduct,
  setEditProduct,
  clearEditProduct,
  clearSellerProducts,
  setProduct,
} = productSlice.actions;

export default productSlice.reducer;
