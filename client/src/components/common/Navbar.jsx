import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navLink = (path) =>
    `group relative font-medium text-[15px] tracking-wide transition duration-300 ${
      location.pathname === path ? "text-[#4F46E5]" : "text-[#0F172A] hover:text-[#4F46E5]"
    }`;

  const Underline = ({ path }) => (
    <span
      className={`absolute left-0 -bottom-1 h-[2px] bg-[#4F46E5] transition-all duration-300 ${
        location.pathname === path ? "w-full" : "w-0 group-hover:w-full"
      }`}
    />
  );

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-xl font-semibold">
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">EventHub</span>
          </h1>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {/* Home */}
            <Link to="/" className={navLink("/")}>
              Home
              <Underline path="/" />
            </Link>

            {/* Events */}
            <Link to="/events" className={navLink("/events")}>
              Events
              <Underline path="/events" />
            </Link>

            {/* Admin */}
            {user?.role === "admin" && (
              <>
                <Link to="/manage-events" className={navLink("/manage-events")}>
                  Manage Events
                  <Underline path="/manage-events" />
                </Link>

                <Link to="/dashboard" className={navLink("/dashboard")}>
                  Dashboard
                  <Underline path="/dashboard" />
                </Link>
              </>
            )}

            {/* Organizer */}
            {user?.role === "organizer" && (
              <>
                <Link to="/create-event" className={navLink("/create-event")}>
                  Create Event
                  <Underline path="/create-event" />
                </Link>

                <Link to="/my-events" className={navLink("/my-events")}>
                  My Events
                  <Underline path="/my-events" />
                </Link>
              </>
            )}

            {/* Student */}
            {user?.role === "student" && (
              <>
                <Link to="/profile" className={navLink("/profile")}>
                  My Profile
                  <Underline path="/profile" />
                </Link>

                <Link to="/registered-events" className={navLink("/registered-events")}>
                  Registered Events
                  <Underline path="/registered-events" />
                </Link>
              </>
            )}

            {/* Auth Section */}
            {!user ? (
              <>
                <Link to="/login" className={navLink("/login")}>
                  Login
                  <Underline path="/login" />
                </Link>

                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-5 py-2 rounded-lg shadow hover:opacity-90 transition font-medium"
                >
                  Signup
                </Link>
              </>
            ) : (
              <div className="relative">
                {/* Avatar */}
                <div
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white font-semibold cursor-pointer"
                >
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>

                {/* Dropdown */}
                {open && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                    <div className="px-4 py-2 text-sm text-[#0F172A] border-b">{user?.name}</div>

                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm text-[#475569] hover:bg-[#F8FAFC]"
                    >
                      My Profile
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#F8FAFC]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
