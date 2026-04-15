// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ROLES from "./roles.js";
import ProtectedRoute from "../components/protected/ProtectedRoute";
import RegistrationFormWrapper from "./wrappers/RegistrationFormWrapper";

// Public Pages
import Home from "../pages/public/Home";
import Events from "../pages/public/Events";
import EventDetails from "../pages/public/EventDetails";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";

// Auth Pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// User Pages
import Dashboard from "../pages/user/Dashboard";
import RegisteredEvents from "../pages/user/RegisteredEvents";
import Profile from "../pages/user/Profile";

// Club Pages
import ClubDashboard from "../pages/club/Dashboard";
import ClubCreateEvent from "../pages/club/EventCreate";
import ClubEventList from "../pages/club/EventList";
import ClubEventDetails from "../pages/club/EventDetails";
import ClubPortal from "../components/Organizer/ClubRedirection.jsx";
import ClubRegistration from "../pages/club/Register.jsx";
import ClubRegistrations from "../pages/club/Registrations.jsx";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminManageEvents from "../pages/admin/ManageEvents";
import AdminManageClubs from "../pages/admin/ManageClubs";
import AdminAllUsers from "../pages/admin/AllUsers";
import AdminAllClubs from "../pages/admin/AllClubs";
import AdminEventDetails from "../pages/admin/AdminEventDetails";
import AdminHome from "../pages/admin/AdminHome.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🌍 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route
        path="/register-for-event/:id"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <RegistrationFormWrapper />
          </ProtectedRoute>
        }
      />

      {/* 🔐 Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget-password" element={<Signup />} />

      {/* 👤 Student/User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/registered-events"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <RegisteredEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute
            allowedRoles={[ROLES.STUDENT, ROLES.CLUB, ROLES.ADMIN]}
          >
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* 🏢 Club Routes */}
      <Route
        path="/club/register"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLUB]}>
            <ClubRegistration />
          </ProtectedRoute>
        }
      />

      <Route
        path="/club/verification"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLUB]}>
            <ClubPortal />
          </ProtectedRoute>
        }
      />

      <Route
        path="/club/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLUB]}>
            <ClubDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/club/create-event"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLUB]}>
            <ClubCreateEvent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/club/my-events/:id"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLUB]}>
            <ClubEventDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/club/my-events"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLUB]}>
            <ClubEventList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/club/registrations"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLUB]}>
            <ClubRegistrations />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/club/profile"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLUB]}>
            <ClubEventList />
          </ProtectedRoute>
        }
      /> */}

      {/* 🛡️ Admin Routes (Nested Layout) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminHome />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="events" element={<AdminManageEvents />} />
        <Route path="event/:id" element={<AdminEventDetails />} />
        <Route path="users" element={<AdminAllUsers />} />
        <Route path="clubs" element={<AdminAllClubs />} />
        <Route path="club/verification" element={<AdminManageClubs />} />
      </Route>

      {/* 🚪 404 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
