// src/pages/MyEvents.jsx
import React, { useEffect } from "react";
import useOrganizer from "../hooks/useOrganizer";
import useAuth from "../hooks/useAuth";

const MyEvents = () => {
  const { user } = useAuth();
  const { orgEvents, fetchOrganizerEvents, deleteOrganizerEvent } = useOrganizer();

  useEffect(() => {
    if (user?.id) {
      fetchOrganizerEvents(user.id);
    }
  }, [user]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">My Events</h2>
      {orgEvents.map((event) => (
        <div key={event.id} className="border p-4 rounded shadow mb-4 flex justify-between">
          <div>
            <p className="font-semibold">{event.title}</p>
            <p className="text-sm text-gray-600">{event.date}</p>
          </div>
          <button
            onClick={() => deleteOrganizerEvent(event.id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyEvents;
