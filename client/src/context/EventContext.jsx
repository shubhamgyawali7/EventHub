// src/context/EventContext.jsx
import React, { createContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use useCallback to prevent unnecessary re-renders if passed to other hooks
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/api/events");
      setEvents(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.message || "Failed to fetch events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

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

  const updateEvent = async (eventId, updatedData) => {
    try {
      setLoading(true);
      const response = await api.put(`/api/events/${eventId}`, updatedData);
      setEvents((prev) =>
        prev.map((event) => (event.id === eventId ? response.data : event)),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      setLoading(true);
      await api.delete(`/api/events/${eventId}`);
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount
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
        createEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
