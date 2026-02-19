// src/context/EventContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  // ✅ Always start with an empty array
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const createEvent = async (eventData) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/events", eventData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEvents((prev) => [...prev, response.data]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateEvent = async (eventId, updatedData) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/events/${eventId}`, updatedData);
      setEvents((prev) =>
        prev.map((event) => (event.id === eventId ? response.data : event))
      );
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/events/${eventId}`);
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
