import { useEffect } from "react";
import Header from "./shared/Header";
import SignupForm from "./signup/SignupForm";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Citizen - Trang chủ";
  });
  return (
    <>
      <Header></Header>
      <div className="container-fluid d-lg-flex justify-content-center bg-secondary bg-opacity-25 p-4">
        <SignupForm id="signup-form"></SignupForm>
      </div>
    </>
  );
};

export default Dashboard;
