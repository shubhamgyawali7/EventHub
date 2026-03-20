import { createSlice } from "@reduxjs/toolkit";
import { fetchOrganizerEvents, deleteOrganizerEvent } from "./organizerAction";

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
