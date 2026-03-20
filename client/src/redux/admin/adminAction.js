import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAdminEvents,
  getAdminUsers,
  approveAdminEvent,
  removeAdminUser,
} from "../../api/admin";

// 📥 Events
export const fetchAdminEvents = createAsyncThunk(
  "admin/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminEvents();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 👥 Users
export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminUsers();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Approve
export const approveEvent = createAsyncThunk(
  "admin/approveEvent",
  async (eventId, { rejectWithValue, dispatch }) => {
    try {
      await approveAdminEvent(eventId);
      dispatch(fetchAdminEvents());
      return eventId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ❌ Remove User
export const removeUser = createAsyncThunk(
  "admin/removeUser",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      await removeAdminUser(userId);
      dispatch(fetchAdminUsers());
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);