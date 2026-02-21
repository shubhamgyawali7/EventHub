// src/pages/RegisteredEvents.jsx
import React, { useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import EventCard from "../common/EventCard";
import useEvents from "../../hooks/useEvents";
import useAuth from "../../hooks/useAuth";

const RegisteredEvents = () => {
  const { user } = useAuth();
  const { events, fetchEvents, loading, error } = useEvents();

  useEffect(() => {
    // Fetch all events, then filter by registered user
    fetchEvents();
  }, []);

  // Filter events where the student is registered
  const registeredEvents = events.filter((event) =>
    event.registeredUsers?.includes(user?.id)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6">My Registered Events</h1>

        {loading && <p>Loading your registered events...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {registeredEvents.length === 0 && !loading ? (
          <p className="text-gray-600">You haven’t registered for any events yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                {...event}
                direction={index % 2 === 0 ? "left" : "right"} // alternate animation
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default RegisteredEvents;
