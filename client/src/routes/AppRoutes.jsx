// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/public/Home";
import Events from "../pages/user/Events";
import About from "../pages/public/About";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import RoleSelection from "../components/auth/RoleSelection";

// Protected Pages
import Dashboard from "../pages/user/Dashboard";
import ManageEvents from "../pages/organizer/ManageEvents";
import MyEvents from "../pages/organizer/MyEvents";
import RegisteredEvents from "../pages/user/RegisteredEvents";
import RegisterClub from "../pages/club/RegisterClub";
import ClubDashboard from "../pages/club/ClubDashboard";

// Protected Route
import ProtectedRoute from "../components/protected/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/select-role" element={<RoleSelection />} />

      {/* 🧑‍🎓 Student */}
      <Route
        path="/registered-events"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <RegisteredEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/club/register"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <RegisterClub />
          </ProtectedRoute>
        }
      />

      {/* 🏢 Club */}
      <Route
        path="/club/dashboard"
        element={
          <ProtectedRoute allowedRoles={["club"]}>
            <ClubDashboard />
          </ProtectedRoute>
        }
      />

      {/* 🧑‍💼 Organizer */}
      <Route
        path="/my-events"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <MyEvents />
          </ProtectedRoute>
        }
      />

      {/* 👑 Admin */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manage-events"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageEvents />
          </ProtectedRoute>
        }
      />

      {/* ❌ 404 */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;