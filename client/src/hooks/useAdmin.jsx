// src/hooks/useAdmin.jsx
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchAdminEvents,
  fetchAdminUsers,
  approveEvent,
  removeUser,
} from "../redux/adminSlice";

const useAdmin = () => {
  const dispatch = useAppDispatch();
  const { events, users, loading, error } = useAppSelector(
    (state) => state.admin,
  );

  return {
    adminData: { events, users, loading, error },
    fetchEvents: () => dispatch(fetchAdminEvents()),
    fetchUsers: () => dispatch(fetchAdminUsers()),
    approveEvent: (id) => dispatch(approveEvent(id)),
    removeUser: (id) => dispatch(removeUser(id)),
  };
};

export default useAdmin;
