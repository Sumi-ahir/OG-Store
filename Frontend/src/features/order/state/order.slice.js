import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",

  initialState: {
    shippingAddress: {
      irstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    products: [],
    totalAmount: 0,
    orders: [],
  },

  reducers: {
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },

    setOrderProducts: (state, action) => {
      state.products = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
  },
});

export const {
  setShippingAddress,
  setOrderProducts,
  setTotalAmount,
  setOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
