import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrganizerEvents,
  deleteOrganizerEventApi,
} from "../../api/organizers";

// 📥 Fetch
export const fetchOrganizerEvents = createAsyncThunk(
  "organizer/fetchOrganizerEvents",
  async (organizerId, { rejectWithValue }) => {
    try {
      const data = await getOrganizerEvents(organizerId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ❌ Delete
export const deleteOrganizerEvent = createAsyncThunk(
  "organizer/deleteOrganizerEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      return await deleteOrganizerEventApi(eventId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);