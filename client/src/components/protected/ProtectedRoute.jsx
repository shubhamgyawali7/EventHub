import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  const role = localStorage.getItem("role"); // ✅ read role

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/continue" replace />;
  }

  return children;
};

export default ProtectedRoute;
