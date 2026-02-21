// src/pages/MyEvents.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useEvents from "../hooks/useEvents";

const MyEvents = () => {
  const { events, deleteEvent, fetchEvents, loading } = useEvents();
  const navigate = useNavigate();

  // Refresh events on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Events</h1>
        <button
          onClick={() => navigate("/create-event")}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
        >
          + Create Event
        </button>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold mb-1">{event.title}</h2>
                <p className="text-gray-600 mb-1">{event.category}</p>
                <p className="text-gray-500 mb-1">
                  {event.district} — {event.venue}
                </p>
                <p className="text-sm text-gray-400">
                  Date: {new Date(event.eventDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => navigate(`/edit-event/${event._id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;