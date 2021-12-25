import React, { useState } from "react";
import InputGroup from "../shared/InputGroup";
import { checkInputs, toggleBtn } from "../shared/handler";
import Error from "../shared/Error";
import { useAuth } from "../../auth/AuthProvider";

const AccountForm = (props) => {
  const auth = useAuth();
  const [error, setError] = useState();
  const fields = ["tenTK", "tenDonvi", "MK"];
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
    fields.forEach((element) => {
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
        if (typeof data === "string") {
          data = JSON.parse(data);
        }

        if (data.error || data.MK || data.tenDonvi || data.tenTK) {
          throw data;
        }

        alert(data.message);
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        if (error.MK) {
          setError("Invalid password");
        } else if (error.tenDonvi) {
          setError("tenDonvi");
        } else if (error.tenTK) {
          setError("wrongtenTK");
        } else if (error.error == "Sai định dạng tài khoản cấp dưới") {
          setError("wrongtenTK");
        } else if (error.error == "Tài khoản đã tồn tại") {
          setError("existtenTK");
        }
      });
  };

  const checkPass = () => {
    const pass = document.getElementById("password").value;
    const repass = document.getElementById("repassword").value;
    if (pass !== repass) {
      setError("Passwords not match");
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
        name={fields[0]}
        id="username"
        label="Tài khoản"
        placeholder="Nhập tài khoản"
        form="account"
      ></InputGroup>
      <InputGroup
        name={fields[1]}
        id="province"
        label={"Tên " + names[auth.info().type]}
        placeholder={"Nhập tên " + names[auth.info().type]}
        form="account"
      ></InputGroup>
      <InputGroup
        type="password"
        name={fields[2]}
        id="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        form="account"
        onChange={checkPass}
      ></InputGroup>
      <InputGroup
        type="password"
        name={fields[2]}
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
