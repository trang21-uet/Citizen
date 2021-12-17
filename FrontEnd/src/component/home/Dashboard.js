import React, { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";

const Dashboard = () => {
  const auth = useAuth();
  useEffect(() => {
    document.title = "Citizen - Trang chủ";
  });
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center text-center">
      <p className="gi h1">Welcome, {auth.info().type}</p>
    </div>
  );
};

export default Dashboard;
