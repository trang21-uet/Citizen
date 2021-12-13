import LoginForm from "./LoginForm";
import Info from "./Info";

const LoginPage = (props) => {
  return (
    <div className="container-fluid d-lg-flex d-block justify-content-around align-items-center vh-100 px-lg-5 px-md-5 px-sm-3">
      <Info className="order-2 flex-grow-1 py-4 text-center"></Info>
      <LoginForm id="login-form"></LoginForm>
    </div>
  );
};

export default LoginPage;
