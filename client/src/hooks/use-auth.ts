import { jwtDecode } from "jwt-decode";

export default function useAuth() {
  const token = localStorage.getItem("jwt");

  let isAuthenticated = false;

  if (token) {
    try {
      const { exp } = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);

      if (!exp) return;

      if (exp > now) {
        isAuthenticated = true;
      } else {
        localStorage.removeItem("jwt");
      }
    } catch {
      localStorage.removeItem("jwt");
    }
  }

  const logout = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  };

  return { token, isAuthenticated, logout };
}
