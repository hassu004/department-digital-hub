
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  // User is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Get logged-in user
  const user = savedUser ? JSON.parse(savedUser) : null;

  // If roles are required, check the user's role
  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;

