import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "./auth-context";
import { useNavigate } from "react-router-dom";

export function GoogleLogin() {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await googleLogin();
    if (user) navigate("/chat");
  };

  return (
    <Button onClick={handleLogin} className="rounded-full" size={"lg"}>
      <FaGoogle className="mr-1" />
      Sign in with Google
    </Button>
  );
}
