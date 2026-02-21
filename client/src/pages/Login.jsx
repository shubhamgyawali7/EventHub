// src/pages/Login.jsx
import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await login(formData); // backend login
      window.location.href = "/continue"; // redirect to role selection
    } catch (err) {
      setError(err.message|| "Login failed. Please try again."); // ✅ show backend error like "Invalid credentials"
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-yellow-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg">
        {/* Branding */}
        <div className="flex justify-center mb-6">
          <span className="text-3xl font-extrabold text-pink-600">EventHub</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to continue exploring events
        </p>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-400 rounded-md p-3 mb-4 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-pink-500 hover:underline font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
