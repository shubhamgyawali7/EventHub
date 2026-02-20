// src/hooks/useEvents.jsx
import { useContext } from "react";
import { EventContext } from "../context/EventContext";

const useEvents = () => {
<<<<<<< HEAD
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
=======
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }

  return context;
>>>>>>> 85a66c6e460514ce0ad0fa688d92f61c772f2c01
};

export default useEvents;
