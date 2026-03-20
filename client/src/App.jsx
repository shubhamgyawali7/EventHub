// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import Events from "./pages/user/Events";
import About from "./pages/public/About";
import Dashboard from "./pages/user/Dashboard";
import ManageEvents from "./pages/organizer/ManageEvents";
import MyEvents from "./pages/organizer/MyEvents";
import RegisteredEvents from "./pages/user/RegisteredEvents";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import RoleSelection from "./components/auth/RoleSelection";
import RegisterClub from "./pages/club/RegisterClub";
import ClubDashboard from "./pages/club/ClubDashboard";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/select-role" element={<RoleSelection />} />

      {/* 1. Route for Students to APPLY for a Club */}
      {/* <Route
        path="/club/register"
        element={
          <ProtectedRoute allowedRoles={["Student"]}>
            <RegisterClub/>
          </ProtectedRoute>
        }
      /> */}

      {/* 2. Route for approved Clubs to access their DASHBOARD */}
      <Route
        path="/club/register"
        element={
          <ProtectedRoute allowedRoles={["Club"]}>
            <RegisterClub />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
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

      {/* Organizer routes */}
      <Route
        path="/my-events"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <MyEvents />
          </ProtectedRoute>
        }
      />

      {/* Student routes */}
      <Route
        path="/registered-events"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <RegisteredEvents />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
