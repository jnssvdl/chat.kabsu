import React from "react";
import { useAuth } from "./auth-context";
import { Navigate } from "react-router-dom";
// import { Loader } from "lucide-react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // return (
    //   <div className="flex min-h-screen items-center justify-center">
    //     <Loader className="animate-spin" />
    //   </div>
    // );

    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  return children;
}
