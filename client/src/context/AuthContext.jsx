// // src/context/AuthContext.jsx
// import React, { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Dummy login/logout for now
//   const login = (role) => {
//     setUser({ role }); // role can be "admin", "organizer", "student"
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// src/context/AuthContext.jsx
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Start with null or pick a role to preview
  const [user, setUser] = useState(null);

  // Fake login: set a dummy user with chosen role
  const loginAsRole = (role) => {
    setUser({
      id: 1,
      name: `${role} User`,
      email: `${role}@example.com`,
      role, // "admin", "organizer", or "student"
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginAsRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
