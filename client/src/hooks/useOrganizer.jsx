// src/hooks/useOrganizer.jsx
import { useContext } from "react";
import { OrganizationContext } from "../context/OrganizationContext";

const useOrganizer = () => {
  const {
    orgEvents,
    loading,
    error,
    fetchOrganizerEvents,
    createOrganizerEvent,
    updateOrganizerEvent,
    deleteOrganizerEvent,
  } = useContext(OrganizationContext);

  return {
    orgEvents,
    loading,
    error,
    fetchOrganizerEvents,
    createOrganizerEvent,
    updateOrganizerEvent,
    deleteOrganizerEvent,
  };
};

export default useOrganizer;
