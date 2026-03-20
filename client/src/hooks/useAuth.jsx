import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice.js";
import { loginUser, registerUser } from "../redux/auth/authAction.js";

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const register = async (formData) => {
    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  const login = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, message: err };
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    login,
    logout: logoutUser,
    register,
    ...auth,
  };
};
export default useAuth;
