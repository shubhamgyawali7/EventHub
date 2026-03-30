import { useDispatch, useSelector } from "react-redux";
import {
  registerClub,
  fetchOrganizerEvents,
  deleteOrganizerEvent,
} from "../redux/organizer/organizerAction";
import { useCallback } from "react";
// import { registerClub } from "../redux/organizer/organizerAction";

const useOrganizer = () => {
  const dispatch = useDispatch();
  const orgEvents = useSelector((state) => state.organizer);

  const clubRegister = useCallback(
    async (clubData) => {
      try {
        console.log("Hook sending data to backend:", clubData);
        const result = await dispatch(registerClub(clubData)).unwrap();
        console.log("Hook received result:", result);
        return { success: true, data: result };
      } catch (err) {
        console.error("Hook error:", err);
        return { success: false, message: err };
      }
    },
    [dispatch],
  );

  // Memoize the fetch function to prevent recreation on every render
  const fetchEvents = useCallback(() => {
    return dispatch(fetchOrganizerEvents());
  }, [dispatch]);

  const deleteEvent = useCallback(
    (id) => {
      return dispatch(deleteOrganizerEvent(id));
    },
    [dispatch],
  );

  return {
    clubRegister,
    fetchOrganizerEvents: fetchEvents,
    deleteOrganizerEvent: deleteEvent,
    ...orgEvents,
  };
};
export default useOrganizer;
