import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchAdminEvents = createAsyncThunk(
  "admin/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/admin/events");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch admin events");
    }
  },
);

export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/admin/users");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch admin users");
    }
  },
);

export const approveEvent = createAsyncThunk(
  "admin/approveEvent",
  async (eventId, { rejectWithValue, dispatch }) => {
    try {
      await api.put(`/api/admin/events/${eventId}/approve`);
      dispatch(fetchAdminEvents());
      return eventId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to approve event");
    }
  },
);

export const removeUser = createAsyncThunk(
  "admin/removeUser",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      await api.delete(`/api/admin/users/${userId}`);
      dispatch(fetchAdminUsers());
      return userId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove user");
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    events: [],
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchAdminEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveEvent.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(approveEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
