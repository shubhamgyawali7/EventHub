import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchOrganizerEvents,
  deleteOrganizerEvent,
} from "../redux/organizer/organizerAction";

const useOrganizer = () => {
  const dispatch = useAppDispatch();
  const orgEvents = useAppSelector((state) => state.organizer);

  return {
    fetchOrganizerEvents: (id) => dispatch(fetchOrganizerEvents(id)),
    deleteOrganizerEvent: (id) => dispatch(deleteOrganizerEvent(id)),
    ...orgEvents,
  };
};

export default useOrganizer;
