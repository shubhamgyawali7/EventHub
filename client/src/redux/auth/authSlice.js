import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, fetchMe } from "./authAction";

const token = localStorage.getItem("authToken");

const initialState = {
  user: null, // Let persist and fetchMe populate this
  loading: false,
  error: null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
      state.isAuthenticated = false;
      localStorage.removeItem("authToken");
      // localStorage.clear(); // careful here, might clear other things
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        console.log("Slice Fullied data=>", action.payload);
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.isAuthenticated = false;
        // localStorage.removeItem("authToken");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
