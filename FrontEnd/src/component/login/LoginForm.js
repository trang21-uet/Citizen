import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "../shared/InputGroup";
import { useAuth } from "../../auth/AuthProvider";
import Error from "../shared/Error";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const auth = useAuth();
  let [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("tenTK");
    const password = formData.get("MK");
    const data = JSON.stringify({
      tenTK: username.trim(),
      MK: password.trim(),
    });

    await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        auth.login(() => {
          sessionStorage.setItem(
            "info",
            JSON.stringify({
              user: data.user,
              access_token: data.access_token,
              type: data.type,
            })
          );
          navigate("/", { replace: true });
        });
      })
      .catch((error) => setError(error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={props.className + " shadow bg-light p-3 rounded"}
      id={props.id}
      autoComplete="off"
    >
      <h1 className="mb-4">Đăng nhập</h1>
      <InputGroup
        type="text"
        name="tenTK"
        id="username"
        label="Tài khoản"
        size="big"
        placeholder="Nhập tài khoản"
        form="login"
      ></InputGroup>
      <InputGroup
        type="password"
        name="MK"
        id="password"
        label="Mật khẩu"
        size="big"
        placeholder="Nhập mật khẩu"
        form="login"
      ></InputGroup>
      {error ? <Error status={error} /> : <></>}
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
