// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure axios to include cookies automatically
  axios.defaults.withCredentials = true;

  const signup = async (formData) => {
    try {
      // const res = await axios.post(`${api}/api/auth/register`, formData);
      const res = await api.post("/api/auth/register", formData);
      setUser(res.data);
      return { success: true };
    } catch (error) {
      console.error("Signup Error:", error.response?.data);
      return {
        success: false,
        message: error.response?.data || "Signup failed",
      };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });
      setUser(res.data);
      return { success: true };
    } catch (error) {
       console.error("Signup Error:", error.response?.data);
      return {
        success: false,
        message: error.response?.data || "Login failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    // Add logout API call here if you have a logout route to clear cookies
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
