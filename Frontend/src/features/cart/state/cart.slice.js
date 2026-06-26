import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: {},
  },

  reducers: {
    setCart: (state, action) => {
      console.log("SET CART PAYLOAD", action.payload);
      const { userId, items } = action.payload;
      state.carts[userId] = items;
    },

    addItem: (state, action) => {
      const { userId, product } = action.payload;

      if (!state.carts[userId]) state.carts[userId] = [];

      const item = state.carts[userId].find(
        (i) => i.productId === product.productId,
      );

      if (item) item.qty += 1;
      else state.carts[userId].push({ ...product, qty: 1 });
    },

    increaseQty: (state, action) => {
      const { userId, productId } = action.payload;

      const item = state.carts[userId]?.find((i) => i.productId === productId);

      if (item) item.qty += 1;
    },

    decreaseQty: (state, action) => {
      const { userId, productId } = action.payload;

      const item = state.carts[userId]?.find((i) => i.productId === productId);

      if (item && item.qty > 1) item.qty -= 1;
    },

    removeItem: (state, action) => {
      const { userId, productId } = action.payload;

      state.carts[userId] =
        state.carts[userId]?.filter((i) => i.productId !== productId) || [];
    },
    clearCart: (state) => {
      state.carts = {};
    },
  },
});

export const {
  setCart,
  addItem,
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
