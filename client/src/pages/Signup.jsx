// src/pages/Signup.jsx
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    district: "", // ✅ required by backend
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await signup(formData); // ✅ send all fields
      window.location.href = "/login";
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-yellow-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <span className="text-3xl font-extrabold text-pink-600">EventHub</span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign up to explore and host amazing events
        </p>
        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400">
            <FaUser className="text-gray-400 mr-3" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full focus:outline-none"
              placeholder="Full Name"
              required
            />
          </div>
          {/* Email */}
          <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400">
            <FaEnvelope className="text-gray-400 mr-3" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full focus:outline-none"
              placeholder="Email Address"
              required
            />
          </div>
          {/* Password */}
          <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full focus:outline-none"
              placeholder="Password"
              required
            />
          </div>
          {/* Confirm Password */}
          <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full focus:outline-none"
              placeholder="Confirm Password"
              required
            />
          </div>
          {/* District */}
          <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400">
            <FaMapMarkerAlt className="text-gray-400 mr-3" />
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full focus:outline-none"
              placeholder="District"
              required
            />
          </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-pink-500 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
