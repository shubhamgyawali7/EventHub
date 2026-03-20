
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllEvents,
  createEventApi,
  updateEventApi,
  deleteEventApi,
} from "../../api/events";

// Fetch Events
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllEvents();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch events",
      );
    }
  },
);

// Create Event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const data = await createEventApi(eventData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create event",
      );
    }
  },
);

// Update Event
export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ eventId, updatedData }, { rejectWithValue }) => {
    try {
      const data = await updateEventApi(eventId, updatedData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update event",
      );
    }
  },
);

// Delete Event
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      return await deleteEventApi(eventId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete event",
      );
    }
  },
);
