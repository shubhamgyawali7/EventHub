// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold"> Stay Updated with IT Events </h1>
      <p className="mt-4 text-lg md:text-xl">
Workshops, seminars, hackathons, and conferences — all in one place.
      </p>
      <Link
        to="/events"
        className="mt-6 inline-block px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition-all"
      >
        Explore Opportunities
      </Link>
    </section>
  );
};

export default Header;
