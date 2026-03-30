import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  //If  Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check role (since roles is in array)
  const hasAccess = user.roles?.some((role) =>
    allowedRoles.includes(role)
  );

  if (!hasAccess) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;