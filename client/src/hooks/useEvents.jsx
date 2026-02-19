// src/hooks/useEvents.jsx
import { useContext } from "react";
import { EventContext } from "../context/EventContext";

const useEvents = () => {
  const {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  } = useContext(EventContext);

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};

export default useEvents;
