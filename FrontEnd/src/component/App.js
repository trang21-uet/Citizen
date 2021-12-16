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
import Error from "./shared/Error";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Dashboard />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="register" element={<Signup />}></Route>
          <Route path="manage" element={<Manage />}></Route>
          <Route path="statistic" element={<Stat />}></Route>
          <Route path="*" element={<Error status={404} />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
