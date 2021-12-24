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
import Citizen from "./stat/Citizen";
import Error from "./shared/Error";
import PersonForm from "./signup/PersonForm";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="register" element={<Signup />} />
          <Route path="modify" element={<PersonForm method="PUT" />} />
          <Route path="manage" element={<Manage />} />
          <Route path="statistic" element={<Stat />}></Route>
          <Route path="statistic/:id" element={<Citizen />}></Route>
          <Route path="*" element={<Error status={404} />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
