import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function GoogleLogin() {
  const navigate = useNavigate();

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.email?.toLowerCase().endsWith("@cvsu.edu.ph")) {
        toast.error("Only @cvsu.edu.ph emails are allowed");
        return;
      }

      const idToken = await user.getIdToken();

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token: idToken }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // alert("Logged in!");

      navigate("/chat");
      window.location.reload();
    } catch (err) {
      // alert("Login failed.");
      if (err instanceof Error) {
        console.error(err.message);
        toast.error(err.message);
      } else {
        console.error("Unknown error", err);
        toast.error("Login failed.");
      }
    }
  };

  return (
    <Button onClick={login} className="rounded-full" size={"lg"}>
      <FaGoogle className="mr-1" />
      Sign in with Google
    </Button>
  );
}
