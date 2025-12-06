import React from "react";
import { useAuth } from "./auth-context";
import { Navigate } from "react-router-dom";
// import { Loader } from "lucide-react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return;

  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  return children;
}
