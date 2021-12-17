import React, { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { checkInputs, toggleBtn } from "../shared/handler";
import Error from "../shared/Error";
import InputGroup from "../shared/InputGroup";

const SignupForm = (props) => {
  const auth = useAuth();
  const [error, setError] = useState();
  const type = props.type;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userType = auth.info().type.toUpperCase();
    const data = JSON.stringify(
      type
        ? {
            maTinh: formData.get("tenTK").trim(),
            tenTinh: formData.get("tenTinh").trim(),
            MK: formData.get("MK").trim(),
            [userType]: auth.info().user,
          }
        : {
            cccd: formData.get("cccd").trim(),
            ho: formData.get("ho").trim(),
            ten: formData.get("ten").trim(),
            ngaySinh: formData.get("ngaySinh").trim(),
            gioiTinh: formData.get("gioiTinh").trim(),
            queQuan: formData.get("queQuan").trim(),
            thuongTru: formData.get("thuongTru").trim(),
            tamTru: formData.get("tamTru").trim(),
            tonGiao: formData.get("tonGiao").trim(),
            trinhDoVanHoa: formData.get("trinhDoVanHoa").trim(),
            ngheNghiep: formData.get("ngheNghiep").trim(),
          }
    );
    console.log("data sent: " + data);
    await fetch(
      "http://localhost:8000/" +
        auth.info().type +
        (type ? "/register" : "/insert"),
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + auth.info().access_token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: data,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
      })
      .catch((error) => setError(error));
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

  const assets = { type, error, handleSubmit, checkPass };

  return props.type ? (
    <RegisterForm assets={assets} className={props.className} id={props.id} />
  ) : (
    <CreateForm assets={assets} className={props.className} id={props.id} />
  );
};

const RegisterForm = (props) => {
  const assets = props.assets;
  return (
    <form
      onSubmit={assets.handleSubmit}
      className={props.className + " shadow bg-light p-3 rounded"}
      id={props.id}
      autoComplete="off"
    >
      <h3 className="mb-4">Tạo tài khoản {assets.type.toUpperCase()} mới</h3>
      <InputGroup
        name="tenTK"
        id="username"
        label="Tài khoản"
        placeholder="Nhập tài khoản"
        formtype="signup"
      ></InputGroup>
      <InputGroup
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
        onChange={assets.checkPass}
      ></InputGroup>
      <InputGroup
        type="password"
        name="MK"
        id="repassword"
        label="Nhập lại mật khẩu"
        placeholder="Nhập mật khẩu"
        formtype="signup"
        onChange={assets.checkPass}
      ></InputGroup>
      {assets.error ? <Error status={assets.error} /> : <></>}

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

const CreateForm = (props) => {
  const assets = props.assets;
  return (
    <form
      onSubmit={assets.handleSubmit}
      className={props.className + " shadow bg-light p-3 rounded"}
      id={props.id}
      autoComplete="off"
    >
      <h3 className="mb-4">Nhập thông tin người dân</h3>
      <InputGroup
        name="ho"
        id="fname"
        label="Họ"
        placeholder="Nguyễn"
        formtype="signup"
      />
      <InputGroup
        name="ten"
        id="lname"
        label="Tên"
        placeholder="Xuân Trang"
        formtype="signup"
      />
      <InputGroup
        name="cccd"
        id="id"
        label="Chứng minh thư/ Căn cước công dân/ Hộ chiếu"
        placeholder="123456789"
        formtype="signup"
      />
      <InputGroup
        name="gioiTinh"
        id="sex"
        label="Giới tính"
        placeholder="Nam"
        formtype="signup"
      />
      <InputGroup
        name="ngaySinh"
        id="dob"
        label="Ngày sinh"
        placeholder="2001-12-31"
        formtype="signup"
      />
      <InputGroup
        name="queQuan"
        id="que"
        label="Quê quán"
        placeholder="Hà Nội"
        formtype="signup"
      />
      <InputGroup
        name="thuongTru"
        id="thuong"
        label="Thường trú"
        placeholder="Hà Nội"
        formtype="signup"
      />
      <InputGroup
        name="tamTru"
        id="tam"
        label="Tạm trú"
        placeholder="Hà Nội"
        formtype="signup"
      />
      <InputGroup
        name="tonGiao"
        id="religion"
        label="Tôn giáo"
        placeholder="Không"
        formtype="signup"
      />
      <InputGroup
        name="trinhDoVanHoa"
        id="level"
        label="Trình độ văn hoá"
        placeholder="12/12"
        formtype="signup"
      />
      <InputGroup
        name="ngheNghiep"
        id="job"
        label="Nghề nghiệp"
        placeholder="Sinh viên"
        formtype="signup"
      />

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
