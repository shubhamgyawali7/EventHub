// src/pages/Events.jsx
import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import EventCard from "../components/common/EventCard";
import useEvents from "../hooks/useEvents";

const Events = () => {
  const { events, loading, error } = useEvents();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 p-8 bg-[#F8FAFC]">
        <h1 className="text-3xl font-bold mb-6 text-[#4F46E5]">All Events</h1>

        {loading && <p className="text-center text-[#475569]">Loading events...</p>}

        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {!loading && Array.isArray(events) && events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <EventCard 
                key={event.id || index} 
                {...event} 
                direction={index % 2 === 0 ? "left" : "right"} 
              />
            ))}
          </div>
        ) : !loading && (
          <div className="flex justify-center items-center py-20">
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center max-w-md">
              <h2 className="text-xl font-semibold text-[#4F46E5] mb-3">
                No Events Available
              </h2>
              <p className="text-[#475569] text-sm">
                There are currently no events scheduled. Please check back later.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Events;