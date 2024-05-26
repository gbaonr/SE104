import { USER_ROUTES } from "constants/Paths";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function SignOut() {
  const { setToken } = useAuth();

  useEffect(() => {
    setToken("");
  }, [setToken]);

  return <Navigate to={USER_ROUTES.HOME} />;
}
