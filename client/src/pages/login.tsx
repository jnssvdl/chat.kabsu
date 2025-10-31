import { useAuth } from "@/components/auth-context";
import { GoogleLogin } from "../components/google-login";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div>
      <GoogleLogin />
    </div>
  );
}
