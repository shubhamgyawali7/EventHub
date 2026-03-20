import { useAppDispatch, useAppSelector } from "../redux/hooks.js";
import {
  fetchAdminEvents,
  fetchAdminUsers,
  approveEvent,
  removeUser,
} from "../redux/admin/adminAction.js";

const useAdmin = () => {
  const dispatch = useAppDispatch();
  const adminData = useAppSelector((state) => state.admin);

  return {
    fetchEvents: () => dispatch(fetchAdminEvents()),
    fetchUsers: () => dispatch(fetchAdminUsers()),
    approveEvent: (id) => dispatch(approveEvent(id)),
    removeUser: (id) => dispatch(removeUser(id)),
    ...adminData,
  };
};

export default useAdmin;
