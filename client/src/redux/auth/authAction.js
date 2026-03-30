import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getMe();
      console.log("AutActionMe data=>",response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Session expired");
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authService.login(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authService.register(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Registration failed");
    }
  },
);
