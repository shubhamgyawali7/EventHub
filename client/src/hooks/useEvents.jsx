// src/hooks/useEvents.jsx
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../redux/eventsSlice";

const useEvents = () => {
  const dispatch = useAppDispatch();
  const {
    items: events,
    loading,
    error,
  } = useAppSelector((state) => state.events);

  return {
    events,
    loading,
    error,
    fetchEvents: () => dispatch(fetchEvents()),
    createEvent: (data) => dispatch(createEvent(data)),
    updateEvent: (payload) => dispatch(updateEvent(payload)),
    deleteEvent: (id) => dispatch(deleteEvent(id)),
  };
};

export default useEvents;
