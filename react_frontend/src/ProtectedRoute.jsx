import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  if (!admin) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

export default ProtectedRoute;
