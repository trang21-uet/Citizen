import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute, AuthProvider } from "../auth/AuthProvider";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
