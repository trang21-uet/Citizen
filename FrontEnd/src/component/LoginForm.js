import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "./InputGroup";
import { useAuth } from "../auth/AuthProvider";
import Error from "./Error";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const auth = useAuth();
  let [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
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
      if (response.ok) {
        return response.json();
      } else {
        throw response.status;
      }
    };
    request("http://localhost:8000/api/login", data)
      .then((res) => {
        auth.login(() => {
          window.localStorage.setItem(
            "info",
            JSON.stringify({
              user: res.user,
              access_token: res.access_token,
              type: res.type,
            })
          );
          navigate("/" + res.type, { replace: true });
        });
      })
      .catch((status) => {
        setError(status);
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
        size="big"
        placeholder="Nhập tài khoản"
        formtype="login"
      ></InputGroup>
      <InputGroup
        type="password"
        name="MK"
        id="password"
        label="Mật khẩu"
        size="big"
        placeholder="Nhập mật khẩu"
        formtype="login"
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
