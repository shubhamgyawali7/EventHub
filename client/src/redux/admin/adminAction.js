import { createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "../../services/adminService"; // Make sure path is correct

// 📥 Events
export const fetchAdminEvents = createAsyncThunk(
  "admin/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getAdminEvents();
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  },
);

// 👥 Users
export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await adminService.getAllUsers();
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  },
);

// 🏢 Clubs
export const fetchAdminClubs = createAsyncThunk(
  "admin/fetchClubs",
  async (_, { rejectWithValue }) => {
    try {
      const clubs = await adminService.getAllClubs();
      console.log("Fetched clubs in action:", clubs); // Debug log
      return clubs;
    } catch (error) {
      console.error("Error fetching clubs:", error);
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  },
);

// ✅ Approve Club
export const adminApproveClub = createAsyncThunk(
  "admin/approveClub",
  async (clubId, { rejectWithValue, dispatch }) => {
    try {
    const updatedClub = await adminService.approveClub(clubId);
      // dispatch(fetchAdminClubs()); // Refresh clubs after approval
       return updatedClub; // return updated club
    } catch (error) {
     return rejectWithValue(error?.response?.data?.message || error.message);
    }
  },
);

// ❌ Reject Club - Add this endpoint in backend
export const rejectClubAdmin = createAsyncThunk(
  "admin/rejectClub",
  async (clubId, { rejectWithValue, dispatch }) => {
    try {
      const updatedClub = await adminService.rejectClub(clubId);
      return updatedClub;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  },
);

// ❌ Delete User
export const deleteUserAdmin = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      await adminService.deleteUser(userId);
      dispatch(fetchAdminUsers());
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

