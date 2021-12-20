import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider";
import Layout from "./Layout";
import Login from "./login/Login";
import Dashboard from "./home/Dashboard";
import Profile from "./profile/Profile";
import Manage from "./manage/Manage";
import Stat from "./stat/Stat";
import Signup from "./signup/Signup";
import Form from "./download/Form";
import Error from "./shared/Error";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="register" element={<Signup />} />
          <Route path="manage" element={<Manage />} />
          <Route path="statistic" element={<Stat />} />
          <Route path="download" element={<Form />} />
          <Route path="*" element={<Error status={404} />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
