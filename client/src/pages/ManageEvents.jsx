// src/pages/ManageEvents.jsx
import React, { useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import useAdmin from "../hooks/useAdmin";

const ManageEvents = () => {
  const { adminData, fetchEvents, approveEvent, removeUser } = useAdmin();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6">Manage Events</h1>

        {adminData.loading && <p>Loading events...</p>}
        {adminData.error && <p className="text-red-500">{adminData.error}</p>}

        <div className="space-y-6">
          {adminData.events.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow rounded p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-sm text-gray-600">📅 {event.date}</p>
                <p className="text-sm text-gray-600">📍 {event.location}</p>
                <p className="text-sm text-gray-600">
                  Deadline: {event.deadline}
                </p>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  {event.approved ? (
                    <span className="text-green-600 font-medium">Approved</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Pending</span>
                  )}
                </p>
              </div>

              <div className="space-x-3">
                {!event.approved && (
                  <button
                    onClick={() => approveEvent(event.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => console.log("Delete event", event.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ManageEvents;
