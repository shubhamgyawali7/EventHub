// src/pages/Continue.jsx
import React, { useState } from "react";
import { FaUserShield, FaUsers, FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Continue = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

 const handleSubmit = (e) => {
  e.preventDefault();
  if (!selectedRole) return;

  localStorage.setItem("role", selectedRole); // ✅ persist role

  if (selectedRole === "admin") {
    navigate("/dashboard");
  } else if (selectedRole === "organizer") {
    navigate("/my-events");
  } else if (selectedRole === "student") {
    navigate("/registered-events");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-yellow-100 relative">
      {/* Background branding */}
      <div className="absolute inset-0 flex justify-center items-center">
        <span className="text-6xl font-extrabold text-pink-200 opacity-20">
          EventHub
        </span>
      </div>

      {/* Overlay form card */}
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg relative z-10">
        {/* Branding */}
        <div className="flex justify-center mb-6">
          <span className="text-3xl font-extrabold text-pink-600">EventHub</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Choose Your Role
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Select how you want to continue
        </p>

        {/* Role Selection Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div
            className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer transition ${
              selectedRole === "admin"
                ? "border-pink-500 bg-pink-50"
                : "hover:border-pink-400"
            }`}
            onClick={() => setSelectedRole("admin")}
          >
            <FaUserShield className="text-gray-400 mr-3" />
            <span className="w-full text-gray-700 font-medium">Admin</span>
          </div>

          <div
            className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer transition ${
              selectedRole === "organizer"
                ? "border-pink-500 bg-pink-50"
                : "hover:border-pink-400"
            }`}
            onClick={() => setSelectedRole("organizer")}
          >
            <FaUsers className="text-gray-400 mr-3" />
            <span className="w-full text-gray-700 font-medium">Organizer</span>
          </div>

          <div
            className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer transition ${
              selectedRole === "student"
                ? "border-pink-500 bg-pink-50"
                : "hover:border-pink-400"
            }`}
            onClick={() => setSelectedRole("student")}
          >
            <FaGraduationCap className="text-gray-400 mr-3" />
            <span className="w-full text-gray-700 font-medium">Student</span>
          </div>

          <button
            type="submit"
            disabled={!selectedRole}
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition disabled:opacity-50"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Continue;
