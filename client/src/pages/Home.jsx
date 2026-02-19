// src/pages/Home.jsx
import React, { useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import EventCard from "../components/common/EventCard";
import useEvents from "../hooks/useEvents";

const Home = () => {
  const { events, fetchEvents, loading, error } = useEvents();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Header />

      <section className="py-12 px-6 md:px-12 flex-1">
        <h2 className="text-2xl font-bold mb-6">Latest Events</h2>

        {loading && <p>Loading events...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {Array.isArray(events) && events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {" "}
            {events.map((event, index) => (
              <EventCard
                key={event.id}
                {...event}
                direction={index % 2 === 0 ? "left" : "right"}
              />
            ))}{" "}
          </div>
        ) : (
          <div className="flex justify-center items-center py-12">
            {" "}
            <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
              {" "}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {" "}
                No Events Available{" "}
              </h3>{" "}
              <p className="text-gray-600">
                {" "}
                Please check back later — new events will be posted soon.{" "}
              </p>{" "}
            </div>{" "}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
