import { useEffect } from "react";
import SignupForm from "./SignupForm";

const Signup = () => {
  useEffect(() => {
    document.title = "Citizen - Đăng ký";
  });
  return (
    <>
      <div className="container-fluid d-lg-flex justify-content-center bg-secondary bg-opacity-25 p-4">
        <SignupForm id="signup-form"></SignupForm>
      </div>
    </>
  );
};

export default Signup;
