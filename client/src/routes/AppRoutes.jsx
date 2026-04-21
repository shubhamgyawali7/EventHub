// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ROLES from "./roles.js";
import ProtectedRoute from "../components/protected/ProtectedRoute";
import RegistrationFormWrapper from "./wrappers/RegistrationFormWrapper";
import UserLayout from "../components/layout/UserLayout";

// Public Pages
import Home from "../pages/public/Home";
import Events from "../pages/public/Events";
import EventDetails from "../pages/public/EventDetails";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import PaymentSuccess from "../pages/public/PaymentSuccess";
import EsewaPayment from "../pages/public/EsewaPayment";

// Auth Pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// User Pages
import Dashboard from "../pages/user/Dashboard";
import RegisteredEvents from "../pages/user/RegisteredEvents";
import Profile from "../pages/user/Profile";

// Club Pages
import ClubDashboard from "../pages/club/ClubDashboard";
import CreateEvents from "../pages/club/CreateEvents";
import ManageYourEvents from "../pages/club/ClubEventListing";
import AdminEventManagement from "../pages/club/ManageEventDetails";
import ClubRegistration from "../pages/club/ClubRegistration.jsx";
import ClubPortal from "../components/Organizer/ClubRedirection.jsx";
import ManageEventRegisterByUser from "../pages/club/ManageEventRegisterByUser";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminManageEvents from "../pages/admin/ManageEvents";
import AdminManageClubs from "../pages/admin/ManageClubs";
import AdminAllUsers from "../pages/admin/AllUsers";
import AdminAllClubs from "../pages/admin/AllClubs";
import AdminEventDetails from "../pages/admin/AdminEventDetails";
import AdminRegistrations from "../pages/admin/AdminRegistrations";
import AdminHome from "../pages/admin/AdminHome.jsx";
import PaymentComplete from "../components/payment/PaymentComplete.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🌍 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/esewa-payment" element={<EsewaPayment />} />

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

      {/* 👤 Student/User Routes (Nested in Layout) */}
      <Route
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registered-events" element={<RegisteredEvents />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route
        path="/payment-complete"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <PaymentComplete />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment-complete"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <PaymentComplete />
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
            <CreateEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/club/my-events/:id"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLUB]}>
            <AdminEventManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/club/my-events"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLUB]}>
            <ManageYourEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/club/registrations"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLUB]}>
            <ManageEventRegisterByUser />
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
        <Route path="registrations" element={<AdminRegistrations />} />
        <Route path="club/verification" element={<AdminManageClubs />} />
      </Route>

      {/* 🚪 404 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
