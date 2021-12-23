import React, { useState } from "react";
import InputGroup from "../shared/InputGroup";
import { checkInputs, toggleBtn } from "../shared/handler";
import Error from "../shared/Error";
import { useAuth } from "../../auth/AuthProvider";

const AccountForm = (props) => {
  const auth = useAuth();
  const [error, setError] = useState();
  const fields = {
    A1: ["tenTK", "tenDonvi", "MK"],
    A2: ["tenTK", "tenDonvi", "MK"],
    A3: ["tenTK", "tenDonvi", "MK"],
    B1: ["tenTK", "tenDonvi", "MK"],
    B2: ["", ""],
  };

  const names = {
    A1: "tỉnh/thành phố",
    A2: "quận/huyện",
    A3: "phường/xã",
    B1: "thôn/bản",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let data = {};
    fields[auth.info().type].forEach((element) => {
      data[element] = formData.get(element).trim();
    });
    data[auth.info().type.toUpperCase()] = auth.info().user;
    console.log(data);
    await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + auth.info().access_token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  const checkPass = () => {
    const pass = document.getElementById("password").value;
    const repass = document.getElementById("repassword").value;
    if (pass !== repass) {
      setError("Passwords not match");
      toggleBtn("account-btn", false);
    } else if (pass.length < 8) {
      setError("Password too short");
      toggleBtn("account-btn", false);
    } else {
      setError(null);
      toggleBtn("account-btn", checkInputs("account-form"));
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={props.className + " shadow bg-light p-3 rounded"}
      id="account-form"
      autoComplete="off"
    >
      <h3 className="mb-4">Tạo tài khoản {props.child.toUpperCase()} mới</h3>
      <InputGroup
        name={fields[auth.info().type][0]}
        id="username"
        label="Tài khoản"
        placeholder="Nhập tài khoản"
        form="account"
      ></InputGroup>
      <InputGroup
        name={fields[auth.info().type][1]}
        id="province"
        label={"Tên " + names[auth.info().type]}
        placeholder={"Nhập tên " + names[auth.info().type]}
        form="account"
      ></InputGroup>
      <InputGroup
        type="password"
        name="MK"
        id="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        form="account"
        onChange={checkPass}
      ></InputGroup>
      <InputGroup
        type="password"
        name="MK"
        id="repassword"
        label="Nhập lại mật khẩu"
        placeholder="Nhập mật khẩu"
        form="account"
        onChange={checkPass}
      ></InputGroup>
      {error ? <Error status={error} /> : <></>}

      <button
        id="account-btn"
        type="submit"
        className="btn shadow rounded w-100 fs-5 py-3"
      >
        Đăng ký
      </button>
    </form>
  );
};

export default AccountForm;
