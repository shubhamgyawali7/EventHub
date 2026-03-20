// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navLinkClass = (path) =>
    `font-medium text-[15px] transition-all duration-300 ${
      location.pathname === path
        ? "text-indigo-600"
        : "text-slate-700 hover:text-indigo-600"
    }`;

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          EventHub
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/events" className={navLinkClass("/events")}>
            Events
          </Link>
          <Link to="/about" className={navLinkClass("/about")}>
            About
          </Link>
          <Link to="/contact" className={navLinkClass("/contact")}>
            Contact
          </Link>

          {!user ? (
            /* --- LOGGED OUT VIEW --- */
            <div className="flex items-center space-x-4">
              <Link to="/login" className={navLinkClass("/login")}>
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-indigo-700 transition shadow-md shadow-indigo-100"
              >
                Get Started
              </Link>
            </div>
          ) : (
            /* --- LOGGED IN VIEW --- */
            <div className="flex items-center space-x-6">
              {/* Conditional Role-Based Link */}
              {user.roles.includes("Club") && (
                <Link
                  to="/club/register"
                  className="text-purple-600 font-bold text-sm bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100"
                >
                  Organizer Dashboard
                </Link>
              )}

              {/* Letter Avatar Section */}
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-white transform transition hover:scale-105"
                >
                  {/* Shows first letter of name */}
                  {user.name.charAt(0).toUpperCase()}
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-60 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Account
                      </p>
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition"
                    >
                      My Profile
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-medium transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
