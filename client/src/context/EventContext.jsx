import React, { createContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all events
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/events"); // ✅ match backend
      setEvents(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch organizer-specific events
  const fetchOrganizerEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/events/organizer"); // ✅ match backend
      setEvents(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.message || "Failed to fetch organizer events");
    } finally {
      setLoading(false);
    }
  }, []);

  // Create event
  const createEvent = async (eventData) => {
    try {
      setLoading(true);
      const response = await api.post("/api/events", eventData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEvents((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update event
  const updateEvent = async (eventId, updatedData) => {
    try {
      setLoading(true);
      const response = await api.put(`/api/events/${eventId}`, updatedData);
      setEvents((prev) =>
        prev.map((e) => (e._id === eventId ? response.data : e))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete event
  const deleteEvent = async (eventId) => {
    try {
      setLoading(true);
      await api.delete(`/api/events/${eventId}`);
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        error,
        fetchEvents,
        fetchOrganizerEvents,
        createEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};