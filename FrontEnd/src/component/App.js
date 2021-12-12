import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import auth from "../logic/auth";
import AuthProvider from "./AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<LoginPage auth={auth} />}></Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
