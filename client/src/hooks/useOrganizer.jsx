// src/hooks/useOrganizer.jsx
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchOrganizerEvents,
  deleteOrganizerEvent,
} from "../redux/organizerSlice";

const useOrganizer = () => {
  const dispatch = useAppDispatch();
  const { orgEvents, loading, error } = useAppSelector(
    (state) => state.organizer,
  );

  return {
    orgEvents,
    loading,
    error,
    fetchOrganizerEvents: (id) => dispatch(fetchOrganizerEvents(id)),
    deleteOrganizerEvent: (id) => dispatch(deleteOrganizerEvent(id)),
  };
};

export default useOrganizer;
