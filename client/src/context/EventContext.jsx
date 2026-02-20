// src/context/EventContext.jsx
<<<<<<< HEAD
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
=======
import React, { createContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";
>>>>>>> 85a66c6e460514ce0ad0fa688d92f61c772f2c01

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
<<<<<<< HEAD
  // ✅ Always start with an empty array
=======
>>>>>>> 85a66c6e460514ce0ad0fa688d92f61c772f2c01
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

<<<<<<< HEAD
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/events");
      // ✅ Ensure response is an array, fallback to []
      setEvents(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setEvents([]); // ✅ fallback to empty array on error
      setLoading(false);
    }
  };
=======
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
>>>>>>> 85a66c6e460514ce0ad0fa688d92f61c772f2c01

  const createEvent = async (eventData) => {
    try {
      setLoading(true);
<<<<<<< HEAD
      const response = await axios.post("/api/events", eventData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEvents((prev) => [...prev, response.data]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
=======
      const response = await api.post("/api/events", eventData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEvents((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err.message);
    } finally {
>>>>>>> 85a66c6e460514ce0ad0fa688d92f61c772f2c01
      setLoading(false);
    }
  };

  const updateEvent = async (eventId, updatedData) => {
    try {
      setLoading(true);
<<<<<<< HEAD
      const response = await axios.put(`/api/events/${eventId}`, updatedData);
      setEvents((prev) =>
        prev.map((event) => (event.id === eventId ? response.data : event))
      );
      setLoading(false);
    } catch (err) {
      setError(err.message);
=======
      const response = await api.put(`/api/events/${eventId}`, updatedData);
      setEvents((prev) =>
        prev.map((event) => (event.id === eventId ? response.data : event)),
      );
    } catch (err) {
      setError(err.message);
    } finally {
>>>>>>> 85a66c6e460514ce0ad0fa688d92f61c772f2c01
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      setLoading(true);
<<<<<<< HEAD
      await axios.delete(`/api/events/${eventId}`);
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
      setLoading(false);
    } catch (err) {
      setError(err.message);
=======
      await api.delete(`/api/events/${eventId}`);
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
    } catch (err) {
      setError(err.message);
    } finally {
>>>>>>> 85a66c6e460514ce0ad0fa688d92f61c772f2c01
      setLoading(false);
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    fetchEvents();
  }, []);
=======
  // Initial fetch on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
>>>>>>> 85a66c6e460514ce0ad0fa688d92f61c772f2c01

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
