import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />;

  if (role && userRole !== role) return <Navigate to="/" />;

  return children;
};
export default ProtectedRoute;
