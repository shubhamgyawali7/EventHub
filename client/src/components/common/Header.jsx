import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-[#F8FAFC] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-[#0F172A] leading-tight">
            Explore Events.
            <span className="block bg-linear-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
              Host Experiences
            </span>
          </h1>

          <p className="mt-6 text-lg text-[#475569] max-w-lg">
            EventHub is your all-in-one platform to discover tech events, register with ease, and stay connected.
            Organizers can seamlessly create and manage events while learners explore and participate effortlessly.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/events"
              className="px-6 py-3 rounded-lg bg-linear-to-r from-[#4F46E5] to-[#7C3AED] text-white font-medium shadow-md hover:opacity-90 transition"
            >
              Explore Events
            </Link>

            <Link
              to="/about"
              className="px-6 py-3 rounded-lg border border-[#4F46E5] text-[#4F46E5] font-medium hover:bg-[#EEF2FF] transition"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Right Side Decorative Card */}
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-[#0F172A]">Upcoming Hackathon 2026 🚀</h3>
            <p className="text-[#475569] mt-3">Join innovators and developers for a 24-hour coding challenge.</p>

            <div className="mt-6 flex justify-between items-center">
              <span className="text-sm text-[#475569]">March 15, 2026</span>
              <button className="text-[#4F46E5] font-medium hover:underline">Register →</button>
            </div>
          </div>

          {/* Background Glow */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#7C3AED] opacity-20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
