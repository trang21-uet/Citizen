import LoginForm from "./LoginForm";
import { useEffect } from "react";
import Info from "./Info";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Citizen - Đăng nhập";
    if (auth.info()) {
      navigate("/", { replace: true });
    }
  });

  return (
    <div
      className="container-fluid d-lg-flex d-block justify-content-around align-items-center vh-100 px-lg-5 px-md-5 px-sm-3"
      id="login-container"
    >
      <Info className="order-2 flex-grow-1 py-4 text-center" />
      <LoginForm />
    </div>
  );
};

export default Login;
