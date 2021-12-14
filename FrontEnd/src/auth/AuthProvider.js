import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthContext = React.createContext(null);

const AuthProvider = (props) => {
  const login = (callback) => {
    callback();
  };

  const logout = (callback) => {
    callback();
  };

  const info = () => {
    const info = localStorage.getItem("info");
    return info ? JSON.parse(info) : null;
  };

  let value = { login, logout, info };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return React.useContext(AuthContext);
};

const ProtectedRoute = (props) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.info()) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else if (location.pathname !== `/${auth.info().type}`) {
    return <Navigate to={"/" + auth.info().type}></Navigate>;
  }

  return props.children;
};

export { AuthProvider, ProtectedRoute, useAuth };
