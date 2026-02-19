// src/hooks/useAdmin.jsx
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const useAdmin = () => {
  const {
    adminData,
    fetchEvents,
    fetchUsers,
    approveEvent,
    deleteEvent,
  } = useContext(AdminContext);

  return {
    adminData,
    fetchEvents,
    fetchUsers,
    approveEvent,
    deleteEvent,
  };
};

export default useAdmin;
