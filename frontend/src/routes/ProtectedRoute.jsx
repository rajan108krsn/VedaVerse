import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  // ⛔ Jab tak login API chal rahi hai, decision mat lo
  if (loading) return null;

  // ❌ Login nahi hai → login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Login ho chuka → andar jaane do
  return <Outlet />;
}
