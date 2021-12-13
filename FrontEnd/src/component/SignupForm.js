import React from "react";
import InputGroup from "./InputGroup";

const SignupForm = (props) => {
  return (
    <form
      action="http://localhost:8000/api/a1/register"
      method="POST"
      className={props.className + " shadow bg-light p-3 rounded"}
      id={props.id}
    >
      <InputGroup
        type="text"
        name="tenTK"
        id="username"
        label="Tài khoản"
        placeholder="Nhập tài khoản"
        formtype="signup"
      ></InputGroup>
      <InputGroup
        type="password"
        name="MK"
        id="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        formtype="signup"
      ></InputGroup>
      <InputGroup
        type="text"
        name="tenTinh"
        id="province"
        label="Tên tỉnh/thành phố"
        placeholder="Nhập tên tỉnh/thành phố"
        formtype="signup"
      ></InputGroup>
      <InputGroup
        type="text"
        name="A1"
        id="parent"
        label="Nhập ID bố"
        placeholder="ID bố"
        formtype="signup"
      ></InputGroup>

      <button
        id="signup-btn"
        type="submit"
        className="btn shadow rounded w-100 fs-4 py-3"
      >
        Đăng ký
      </button>
    </form>
  );
};

export default SignupForm;
