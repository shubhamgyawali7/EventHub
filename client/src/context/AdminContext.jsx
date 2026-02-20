// src/context/AdminContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const AdminContext = createContext();

// Provider component
export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState({
    events: [],
    users: [],
    loading: false,
    error: null,
  });

  // Example: fetch all events
  const fetchEvents = async () => {
    try {
      setAdminData((prev) => ({ ...prev, loading: true }));
      const response = await axios.get("/api/admin/events"); // backend route
      setAdminData((prev) => ({ ...prev, events: response.data, loading: false }));
    } catch (err) {
      setAdminData((prev) => ({ ...prev, error: err.message, loading: false }));
    }
  };

  // Example: fetch all users
  const fetchUsers = async () => {
    try {
      setAdminData((prev) => ({ ...prev, loading: true }));
      const response = await axios.get("/api/admin/users"); // backend route
      setAdminData((prev) => ({ ...prev, users: response.data, loading: false }));
    } catch (err) {
      setAdminData((prev) => ({ ...prev, error: err.message, loading: false }));
    }
  };

  // Example: approve event
  const approveEvent = async (eventId) => {
    try {
      await axios.put(`/api/admin/events/${eventId}/approve`);
      fetchEvents(); // refresh events after approval
    } catch (err) {
      setAdminData((prev) => ({ ...prev, error: err.message }));
    }
  };

  // Example: remove user
  const removeUser = async (userId) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      fetchUsers(); // refresh users after removal
    } catch (err) {
      setAdminData((prev) => ({ ...prev, error: err.message }));
    }
  };

  // Load initial data when admin logs in
  useEffect(() => {
    fetchEvents();
    fetchUsers();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        adminData,
        fetchEvents,
        fetchUsers,
        approveEvent,
        removeUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
