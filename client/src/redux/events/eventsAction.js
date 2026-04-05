import { createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "../../services/eventService";

const BASE_URL = import.meta.env.VITE_BASE_API_URL || "http://localhost:5000";

// Converts "/uploads/events/xxx.png" → "http://localhost:5000/uploads/events/xxx.png"
// If the poster is already a full URL (http/https), it is left untouched.

const normalizePoster = (poster) => {
  if (!poster) return null;
  if (poster.startsWith("http")) return poster;
  return `${BASE_URL}${poster}`;
};

const normalizeEvent = (event) => ({
  ...event,
  poster: normalizePoster(event.poster),
});

// ─────────────────────────────────────────────────────────────

// Fetch All Events
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const data = await eventService.getAllEvents();
      const events = Array.isArray(data) ? data : [];
      return events.map(normalizeEvent); // ← normalize every event's poster
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch events");
    }
  },
);

// Fetch Event By Id
export const getEventById = createAsyncThunk(
  "events/fetchEventById",
  async (eventId, { rejectWithValue }) => {
    try {
      const data = await eventService.getEventById(eventId);
      return normalizeEvent(data);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch event");
    }
  },
);

// Create Event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const data = await eventService.createEvent(eventData);
      return normalizeEvent(data.newEvent ?? data); // ← normalize after creation
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create event");
    }
  },
);

// Update Event
export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ eventId, updatedData }, { rejectWithValue }) => {
    try {
      const data = await eventService.updateEvent(eventId, updatedData);
      return normalizeEvent(data);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update event");
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
      return rejectWithValue(error.message || "Failed to delete event");
    }
  },
);