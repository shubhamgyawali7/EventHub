// src/pages/Home.jsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/common/Navbar";
import Header from "../../components/common/Header";
import Stats from "../../components/common/Stats";
import Footer from "../../components/common/Footer";
import EventCard from "../../components/common/EventCard";

import useEvents from "../../hooks/useEvents";

const Home = () => {
  const { events, fetchEvents, loading, error } = useEvents();

  // ✅ Direct Redux access (better than useAuth for just reading user)
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]); // ✅ added dependency

  console.log("Current User in Home:", user);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Header />
      <Stats />

      <section className="py-12 px-6 md:px-12 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Events</h2>

          {/* ✅ Optional: show user info */}
          {user && (
            <p className="text-sm text-gray-600">
              Welcome, <span className="font-semibold">{user?.name}</span>
            </p>
          )}
        </div>

        {/* 🔄 Loading */}
        {loading && (
          <div className="flex justify-center py-10">
            <p className="text-gray-500 animate-pulse">
              Loading events...
            </p>
          </div>
        )}

        {/* ❌ Error */}
        {error && (
          <div className="flex justify-center py-10">
            <p className="text-red-500 bg-red-50 px-4 py-2 rounded">
              {error}
            </p>
          </div>
        )}

        {/* ✅ Events */}
        {!loading && !error && Array.isArray(events) && events.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <EventCard
                key={event._id || event.id}
                {...event}
                direction={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        )}

        {/* 📭 Empty State */}
        {!loading && !error && events?.length === 0 && (
          <div className="flex justify-center items-center py-12">
            <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Events Available
              </h3>
              <p className="text-gray-600">
                Please check back later — new events will be posted soon.
              </p>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Home;