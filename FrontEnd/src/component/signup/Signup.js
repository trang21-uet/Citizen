import { useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import SignupForm from "./SignupForm";

const Signup = () => {
  const auth = useAuth();
  const children = {
    a1: "a2",
    a2: "a3",
    a3: "b1",
    b1: "b2",
  };
  const child = children[auth.info().type] ? children[auth.info().type] : "";

  useEffect(() => {
    document.title = "Citizen - Đăng ký";
  });

  return (
    <div className="container-fluid d-lg-flex justify-content-start bg-light bg-opacity-25 p-4">
      <SignupForm child={child} />
    </div>
  );
};

export default Signup;
