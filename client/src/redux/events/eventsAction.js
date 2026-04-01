import { createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "../../services/eventService";

// Fetch Events
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const data = await eventService.getAllEvents();
   
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch events",
      );
    }
  },
);

// Fetch Event By Id
export const getEventById = createAsyncThunk(
  "events/fetchEventById",
  async (_, { rejectWithValue }) => {
    try {
      const data = await eventService.getEventById();
       return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch events",
      );
    }
  },
);

// Create Event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      console.log("Redux sending event data:", eventData);
      const data = await eventService.createEvent(eventData);
       console.log("Redux received response:", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to create event",
      );
    }
  },
);

// Update Event
export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ eventId, updatedData }, { rejectWithValue }) => {
    try {
      const data = await eventService.updateEvent(eventId, updatedData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to update event",
      );
    }
  },
);

// Delete Event
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      return await eventService.deleteEvent(eventId);
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to delete event",
      );
    }
  },
);
