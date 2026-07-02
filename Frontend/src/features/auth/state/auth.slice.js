import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    // loading: true,
    loading:false,
    error: null,
      checkingAuth: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCheckingAuth: (state, action) => {
      state.checkingAuth = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});
export const { setError, setLoading, setUser, clearUser,setCheckingAuth} = authSlice.actions;
export default authSlice.reducer;
