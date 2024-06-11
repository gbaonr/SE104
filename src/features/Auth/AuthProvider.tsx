import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUserInfo } from "apis/users";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

// TODO: fix when JWT token is expired

const AuthContext = createContext({
  token: null,
  setToken: (newToken) => {},
  hasAdminAccess: false,
  setExpiredDate: (newExpiredDate) => {},
  expiredDate: null,
  isAuthLoading: true,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [expiredDate, setExpiredDate_] = useState(localStorage.getItem("expiredDate"));
  const [hasAdminAccess, setHasAdminAccess] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const updateAdminAccess = async () => {
    const response = await getUserInfo();

    if (response?.status === "success") {
      setHasAdminAccess(response.data.role === "admin");
    }

    setIsAuthLoading(false);
  };

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setExpiredDate = (newExpiredDate) => {
    setExpiredDate_(newExpiredDate);
  };

  const isTokenExpired = () => {
    const expiryDate = new Date(expiredDate);

    if (expiredDate === null) return true;
    if (expiredDate === "null") return true;

    return new Date() > expiryDate;
  };

  const handleExpiredToken = () => {
    if (isTokenExpired()) {
      toast.error("Your session has expired. Please log in again.");

      setToken(null);
      setExpiredDate(null);
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
      localStorage.setItem("expiredDate", expiredDate);

      handleExpiredToken();
    } else {
      delete axios.defaults.headers.common["Authorization"];

      localStorage.removeItem("token");
      localStorage.removeItem("expiredDate");
    }

    updateAdminAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, expiredDate]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      hasAdminAccess,
      setExpiredDate,
      expiredDate,
      isAuthLoading,
    }),
    [token, hasAdminAccess, expiredDate, isAuthLoading],
  );

  // Provide the authentication context to the children components
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthenticatedComponent = ({ children }) => {
  const { token, expiredDate } = useAuth();

  if (!token || new Date() > new Date(expiredDate)) {
    return <Navigate to="/login" />;
  }

  return children;
};
