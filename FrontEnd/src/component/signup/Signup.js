import { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import SignupForm from "./SignupForm";

const Signup = () => {
  const auth = useAuth();
  const child = {
    a1: "a2",
    a2: "a3",
    a3: "b1",
  };
  const type = child[auth.info().type] ? child[auth.info().type] : "";

  useEffect(() => {
    document.title = "Citizen - Đăng ký";
  });

  return (
    <div className="container-fluid d-lg-flex justify-content-center bg-light bg-opacity-25 p-4">
      <SignupForm type={type} id="signup-form"></SignupForm>
    </div>
  );
};

export default Signup;
