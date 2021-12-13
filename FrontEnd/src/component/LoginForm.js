import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputGroup from "./InputGroup";
import { useAuth } from "../auth/AuthProvider";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    let from = location.state.from.pathname;
    if (!from) {
      from = "/";
    }
    const formData = new FormData(event.currentTarget);
    const username = formData.get("tenTK");
    const password = formData.get("MK");
    const data = JSON.stringify({
      tenTK: username,
      MK: password,
    });

    const request = async (url, data) => {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      });
      return response.json();
    };
    request("http://localhost:8000/api/login", data).then((res) => {
      auth.login(res.user, res.access_token, res.type, () => {
        window.localStorage.removeItem("access_token");
        window.localStorage.setItem("access_token", res.access_token);
        navigate(from, { replace: true });
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={props.className + " shadow bg-light p-3 rounded"}
      id={props.id}
    >
      <h1 className="mb-4">Đăng nhập</h1>
      <InputGroup
        type="text"
        name="tenTK"
        id="username"
        label="Tài khoản"
        placeholder="Nhập tài khoản"
        formtype="login"
      ></InputGroup>
      <InputGroup
        type="password"
        name="MK"
        id="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        formtype="login"
      ></InputGroup>

      <button
        id="login-btn"
        type="submit"
        disabled
        className="btn shadow rounded w-100 fs-4 py-3"
      >
        Đăng nhập
      </button>
    </form>
  );
};

export default LoginForm;
