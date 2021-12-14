import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { checkInputs, toggleBtn } from "../logic/handler";
import Error from "./Error";
import InputGroup from "./InputGroup";

const SignupForm = (props) => {
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userType = auth.info().type.toUpperCase();
    const data = JSON.stringify({
      maTinh: formData.get("tenTK").trim(),
      tenTinh: formData.get("tenTinh").trim(),
      MK: formData.get("MK").trim(),
      [userType]: auth.info().user,
    });

    const request = async (url, data) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + auth.info().access_token,
          "Content-Type": "application/json",
        },
        body: data,
      });
      console.log("data: " + data);
      if (response.ok) {
        return response.json();
      } else {
        throw response.status;
      }
    };

    request("http://localhost:8000/api/" + auth.info().type + "/register", data)
      .then((res) => {
        alert(res.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkPass = () => {
    const pass = document.getElementById("password").value;
    const repass = document.getElementById("repassword").value;
    if (pass !== repass) {
      setError("Passwords not match");
      toggleBtn("signup", false);
    } else {
      setError(null);
      toggleBtn("signup", checkInputs());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={props.className + " shadow bg-light p-3 rounded"}
      id={props.id}
    >
      <h3 className="mb-4">Tạo tài khoản mới</h3>
      <InputGroup
        type="text"
        name="tenTK"
        id="username"
        label="Tài khoản"
        placeholder="Nhập tài khoản"
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
        type="password"
        name="MK"
        id="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        formtype="signup"
        onChange={checkPass}
      ></InputGroup>
      <InputGroup
        type="password"
        name="MK"
        id="repassword"
        label="Nhập lại mật khẩu"
        placeholder="Nhập mật khẩu"
        formtype="signup"
        onChange={checkPass}
      ></InputGroup>
      {error ? <Error status={error} /> : <></>}

      <button
        id="signup-btn"
        type="submit"
        className="btn shadow rounded w-100 fs-5 py-3"
      >
        Đăng ký
      </button>
    </form>
  );
};

export default SignupForm;
