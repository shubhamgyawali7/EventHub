// src/hooks/useAuth.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { user, login, logout, signup } = useContext(AuthContext);

  return {
    user,
    login,
    logout,
    signup,
  };
};

export default useAuth;
