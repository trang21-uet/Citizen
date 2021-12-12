import React, { useState } from "react";

const AuthProvider = (props) => {
  let [user, setUser] = useState(null);

  let login = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  let logout = (callback) => {
    setUser(null);
    callback();
  };

  let isLoggedIn = () => {
    return !!user;
  };

  return <>{props.children}</>;
};

export default AuthProvider;
