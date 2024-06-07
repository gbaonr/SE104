import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUserInfo } from "apis/users";

// TODO: fix when JWT token is expired

const AuthContext = createContext({
  token: null,
  setToken: (newToken) => {},
  hasAdminAccess: false,
});

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [expiresIn, setExpiresIn] = useState(localStorage.getItem("expiresIn"));

  const [hasAdminAccess, setHasAdminAccess] = useState(false);

  const updateAdminAccess = async () => {
    const response = await getUserInfo();

    if (response.status === "success") {
      setHasAdminAccess(response.data.role === "admin");
    }
  };

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }

    updateAdminAccess();
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      hasAdminAccess,
    }),
    [token, hasAdminAccess],
  );

  // Provide the authentication context to the children components
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
