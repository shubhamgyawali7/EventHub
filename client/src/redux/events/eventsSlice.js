import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "./eventsAction";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.unshift(action.payload);
        // state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.events = state.events.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (item) => item.id !== action.payload,
        );
      });
  },
});

export default eventsSlice.reducer;
