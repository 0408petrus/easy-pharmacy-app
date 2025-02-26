import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem("user");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}