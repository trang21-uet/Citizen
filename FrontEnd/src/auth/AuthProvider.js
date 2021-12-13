import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthContext = React.createContext(null);

const AuthProvider = (props) => {
  let [user, setUser] = useState(null);
  let [token, setToken] = useState(null);
  let [userType, setUserType] = useState(null);

  const login = (newUser, newToken, newUserType, callback) => {
    setUser(newUser);
    setToken(newToken);
    setUserType(newUserType);
    callback();
  };

  const logout = (callback) => {
    setUser(null);
    setToken(null);
    setUserType(null);
    callback();
  };

  let value = { user, token, userType, login, logout };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return React.useContext(AuthContext);
};

const ProtectedRoute = (props) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return props.children;
};

export { AuthProvider, ProtectedRoute, useAuth };
