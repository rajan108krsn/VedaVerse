import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const { token, loading } = useSelector((state) => state.auth);

  // jab tak auth decide ho raha hai
  if (loading) {
    return <div>Loading...</div>;
  }

  // agar login nahi hai
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // login hai → page allow
  return <Outlet />;
}
