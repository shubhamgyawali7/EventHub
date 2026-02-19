// src/context/OrganizationContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const OrganizationContext = createContext();

// Provider component
export const OrganizationProvider = ({ children }) => {
  const [orgEvents, setOrgEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch events created by this organizer
  const fetchOrganizerEvents = async (organizerId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/organizers/${organizerId}/events`);
      setOrgEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Create a new event
  const createOrganizerEvent = async (eventData) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/organizers/events", eventData, {
        headers: { "Content-Type": "multipart/form-data" }, // for image upload
      });
      setOrgEvents((prev) => [...prev, response.data]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Update an existing event
  const updateOrganizerEvent = async (eventId, updatedData) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/organizers/events/${eventId}`, updatedData);
      setOrgEvents((prev) =>
        prev.map((event) => (event.id === eventId ? response.data : event))
      );
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Delete an event
  const deleteOrganizerEvent = async (eventId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/organizers/events/${eventId}`);
      setOrgEvents((prev) => prev.filter((event) => event.id !== eventId));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        orgEvents,
        loading,
        error,
        fetchOrganizerEvents,
        createOrganizerEvent,
        updateOrganizerEvent,
        deleteOrganizerEvent,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
