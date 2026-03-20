import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../redux/events/eventAction.js";

const useEvents = () => {
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events);

  const fetchAllEvents = async () => {
    try {
      const res = await dispatch(fetchEvents()).unwrap();
      return { success: true, data: res };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  const createNewEvent = async (data) => {
    try {
      const res = await dispatch(createEvent(data)).unwrap();
      return { success: true, data: res };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  const updateExistingEvent = async (payload) => {
    try {
      const res = await dispatch(updateEvent(payload)).unwrap();
      return { success: true, data: res };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  const deleteExistingEvent = async (id) => {
    try {
      await dispatch(deleteEvent(id)).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  return {
    fetchEvents: fetchAllEvents,
    createEvent: createNewEvent,
    updateEvent: updateExistingEvent,
    deleteEvent: deleteExistingEvent,
     ...event,
  };
};

export default useEvents;