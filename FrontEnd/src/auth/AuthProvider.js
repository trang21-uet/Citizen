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
    const info = sessionStorage.info;
    return info ? JSON.parse(info) : null;
  };

  const paths = {
    login: "/login",
    home: "/",
    signup: "/register",
    profile: "/profile",
    stat: "/statistic",
    manage: "/manage",
    down: "/download",
  };

  let value = { login, logout, info, paths };

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
  }

  return <div className="bg-light bg-opacity-25">{props.children}</div>;
};

export { AuthProvider, ProtectedRoute, useAuth };
