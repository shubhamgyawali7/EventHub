import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchOrganizerEvents = createAsyncThunk(
  "organizer/fetchOrganizerEvents",
  async (organizerId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/organizers/${organizerId}/events`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch organizer events",
      );
    }
  },
);

export const deleteOrganizerEvent = createAsyncThunk(
  "organizer/deleteOrganizerEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      await api.delete(`/api/organizers/events/${eventId}`);
      return eventId;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to delete organizer event",
      );
    }
  },
);

const organizerSlice = createSlice({
  name: "organizer",
  initialState: {
    orgEvents: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizerEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizerEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.orgEvents = action.payload;
      })
      .addCase(fetchOrganizerEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrganizerEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrganizerEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.orgEvents = state.orgEvents.filter(
          (event) => event.id !== action.payload,
        );
      })
      .addCase(deleteOrganizerEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default organizerSlice.reducer;
