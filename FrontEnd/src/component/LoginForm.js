import React, { useState } from "react";
import { useNavigate } from "react-router";
import { handleInputChange, handleFormSubmit } from "../logic/handler";

const LoginForm = (props) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    handleFormSubmit(navigate);
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      // action="http://localhost:8000/api/login"
      // method="POST"
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
      ></InputGroup>
      <InputGroup
        type="password"
        name="MK"
        id="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
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

const InputGroup = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    handleInputChange();
  };

  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="form-label fs-4">
        {props.label}
      </label>
      <input
        className="form-control fs-5 p-3"
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default LoginForm;
