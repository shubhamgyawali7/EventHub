// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Events from "./pages/Events";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Continue from "./pages/Continue"; 
import CreateEvent from "./pages/create-event";
import EditEvent from "./pages/edit-event";
// Role-based pages
import Dashboard from "./pages/Dashboard";
import ManageEvents from "./pages/ManageEvents";
import MyEvents from "./pages/MyEvents";
import RegisteredEvents from "./components/user/RegisteredEvents";

// Protected route wrapper
import ProtectedRoute from "./components/protected/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/continue" element={<Continue />} /> {/* ✅ added */}
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
      <Route
        path="/create-event"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <CreateEvent />
          </ProtectedRoute>
        }
      /> 
      <Route
        path="/edit-event/:id"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <EditEvent />
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
