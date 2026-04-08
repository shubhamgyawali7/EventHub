import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  getEventById,
  deleteEvent,
} from "../redux/events/eventsAction.js";
import eventService from "../services/eventService.jsx";
const useEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const selectedEvent = useSelector((state) => state.events.selectedEvent);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);

  const fetchAllEvents = useCallback(async (params = {}) => {
    try {
      const res = await dispatch(fetchEvents(params)).unwrap();
      return { success: true, data: res };
    } catch (err) {
      return { success: false, message: err };
    }
  }, [dispatch]);

  const fetchEventById = useCallback(
    async (id) => {
      try {
        const res = await dispatch(getEventById(id)).unwrap();
        return { success: true, data: res };
      } catch (err) {
        return { success: false, message: err };
      }
    },
    [dispatch],
  );

  const createNewEvent = useCallback(
    async (data) => {
      try {
        const res = await dispatch(createEvent(data)).unwrap();
        // const res = await eventService.createEvent(data).unwrap();
        console.log("gone form Hook");
        return { success: true, data: res };
      } catch (err) {
        return { success: false, message: err };
      }
    },
    [dispatch],
  );

  const updateExistingEvent = useCallback(
    async (payload) => {
      try {
        const res = await dispatch(updateEvent(payload)).unwrap();
        return { success: true, data: res };
      } catch (err) {
        return { success: false, message: err };
      }
    },
    [dispatch],
  );

  const deleteExistingEvent = useCallback(
    async (id) => {
      try {
        await dispatch(deleteEvent(id)).unwrap();
        return { success: true };
      } catch (err) {
        return { success: false, message: err };
      }
    },
    [dispatch],
  );

  return {
    fetchEvents: fetchAllEvents,
    fetchEventById,
    createEvent: createNewEvent,
    updateEvent: updateExistingEvent,
    deleteEvent: deleteExistingEvent,
    events, 
    selectedEvent, 
    loading,
    error,
  };
};

export default useEvents;
