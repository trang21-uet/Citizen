import LoginForm from "./LoginForm";
import Info from "./Info";
import { useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Citizen - Đăng nhập";
    if (auth.info()) {
      navigate(`/${auth.info().type}`, { replace: true });
    }
  });

  return (
    <div
      className="container-fluid d-lg-flex d-block justify-content-around align-items-center vh-100 px-lg-5 px-md-5 px-sm-3"
      id="login-container"
    >
      <Info className="order-2 flex-grow-1 py-4 text-center"></Info>
      <LoginForm id="login-form"></LoginForm>
    </div>
  );
};

export default Login;
