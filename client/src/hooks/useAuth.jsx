import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser, logout } from "../redux/auth/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const signup = async (formData) => {
    try {
      const result = await dispatch(signupUser(formData)).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, message: err || "Signup failed" };
    }
  };

  const login = async (email, password) => {
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, message: err || "Login failed" };
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    user,
    loading,
    error,
    login,
    logout: logoutUser,
    signup,
  };
};

export default useAuth;
