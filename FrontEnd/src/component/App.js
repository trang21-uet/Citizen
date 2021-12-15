import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute, AuthProvider } from "../auth/AuthProvider";
import Dashboard from "./Dashboard";
import Login from "./login/Login";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
