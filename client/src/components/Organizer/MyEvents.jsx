import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch organizer's events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events/organizer", {
        withCredentials: true, // include cookies for auth
      });
      setEvents(res.data); // make sure backend returns array of events
    } catch (err) {
      console.error("Error fetching events:", err);
      alert("Failed to fetch your events. Are you logged in?");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        withCredentials: true,
      });
      setEvents(events.filter((e) => e._id !== id));
      alert("Event deleted successfully!");
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("You are not authorized to delete this event.");
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/create-event")}
        className="bg-pink-500 text-white px-4 py-2 rounded-lg"
      >
        + Create Event
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {events.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No events found. Create one!
          </p>
        )}

        {events.map((event) => (
          <div key={event._id} className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-bold">{event.title}</h2>
            <p className="text-gray-600">{event.category}</p>
            <p className="text-gray-500">
              {event.district} — {event.venue}
            </p>
            <p className="text-sm text-gray-400">Date: {event.eventDate?.split("T")[0]}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => navigate(`/edit-event/${event._id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;