import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user from localStorage on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Signup
  const signup = async ({ name, email, password, confirmPassword, district }) => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmPassword, district }),
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(typeof data === "string" ? data : data.message || "Signup failed");
    }

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data)); // ✅ persist
    return data;
  };

  // Login
  const login = async ({ email, password }) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(typeof data === "string" ? data : data?.message || "Login failed");
    }

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data)); // ✅ persist
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // ✅ clear persistence
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
