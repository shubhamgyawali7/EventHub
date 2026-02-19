// src/components/common/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">EventHub</h1>
      <div className="space-x-4">
        {/* Always visible */}
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>

        {/* Role-based links */}
        {user?.role === "admin" && (
          <>
            <Link to="/manage-events">Manage Events</Link>
            <Link to="/dashboard">Dashboard</Link>
          </>
        )}
        {user?.role === "organizer" && (
          <>
            <Link to="/create-event">Create Event</Link>
            <Link to="/my-events">My Events</Link>
          </>
        )}
        {user?.role === "student" && (
          <>
            <Link to="/profile">My Profile</Link>
            <Link to="/registered-events">Registered Events</Link>
          </>
        )}

        {/* Auth links */}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
