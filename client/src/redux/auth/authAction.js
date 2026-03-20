import { createAsyncThunk } from "@reduxjs/toolkit";
import login from "../../api/auth/login";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {

    try {
      const response = await login(data);

      localStorage.setItem("authToken", response.data?.token); 

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  },
);


export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.post("/api/auth/register", data);
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response?.data || "Signup failed");
      }
    },
);
