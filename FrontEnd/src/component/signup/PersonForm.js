import React, { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { toggleModal } from "../shared/handler";
import InputGroup, { RadioGroup } from "../shared/InputGroup";
import Error from "../shared/Error";

const PersonForm = (props) => {
  const auth = useAuth();
  const [error, setError] = useState();
  const fields = [
    "cccd",
    "ho",
    "ten",
    "ngaySinh",
    "gioiTinh",
    "queQuan",
    "thuongTru",
    "tamTru",
    "tonGiao",
    "trinhDoVanHoa",
    "ngheNghiep",
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let data = {};
    fields.forEach((element) => {
      data[element] = formData.get(element).trim();
    });

    await fetch("http://localhost:8000/api/insert", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + auth.info().access_token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response.status;
      })
      .then((data) => {
        if (typeof data === "string") {
          data = JSON.parse(data);
        }
        console.log(data);
        if (data.error) {
          throw data;
        }
        toggleModal("person-alert", true);
      })
      .catch((error) => {
        console.log(error);
        error === 400 && alert("Lỗi dữ liệu");
        error.error && setError("error");
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={props.className + " shadow bg-light p-3 rounded"}
      id="person-form"
      autoComplete="off"
    >
      <h3 className="mb-4">Nhập thông tin người dân</h3>

      <div className="d-flex flex-column">
        <div className="row">
          <InputGroup
            className="col-sm-4"
            name="ho"
            id="fname"
            label="Họ"
            placeholder="Họ"
            form="person"
            required
          />
          <InputGroup
            className="col-sm-5"
            name="ten"
            id="lname"
            label="Tên"
            placeholder="Tên"
            form="person"
            required
          />
          <Radio id="sex"></Radio>
        </div>
        <div className="row">
          <InputGroup
            className="col-sm"
            name="cccd"
            id="id"
            label="CMT/ CCCD"
            placeholder="123456789"
            form="person"
            required
          />
          <InputGroup
            className="col-sm"
            name="ngaySinh"
            type="date"
            id="dob"
            label="Ngày sinh"
            placeholder="2001-12-31"
            form="person"
            required
          />
        </div>
        <InputGroup
          name="queQuan"
          id="que"
          label="Quê quán"
          placeholder="Hà Nội"
          form="person"
          required
        />
        <InputGroup
          name="thuongTru"
          id="thuong"
          label="Thường trú"
          placeholder="Hà Nội"
          form="person"
          required
        />
        <InputGroup
          name="tamTru"
          id="tam"
          label="Tạm trú"
          placeholder="Hà Nội"
          form="person"
        />
        <div className="row">
          <InputGroup
            className="col-sm"
            name="tonGiao"
            id="religion"
            label="Tôn giáo"
            placeholder="Không"
            form="person"
            required
          />
          <InputGroup
            className="col-sm"
            name="trinhDoVanHoa"
            id="level"
            label="Trình độ văn hoá"
            placeholder="12/12"
            form="person"
            required
          />
          <InputGroup
            className="col-sm"
            name="ngheNghiep"
            id="job"
            label="Nghề nghiệp"
            placeholder="Sinh viên"
            form="person"
            required
          />
        </div>
      </div>
      {error ? <Error status={error} /> : <></>}
      <button
        id="person-btn"
        type="submit"
        className="btn shadow rounded w-100 fs-5 py-3"
        disabled
      >
        Đăng ký
      </button>
    </form>
  );
};

const Radio = (props) => {
  return (
    <div className={props.className + " col-sm"}>
      <label className="d-block form-label fs-5">Giới tính</label>
      <RadioGroup
        name="gioiTinh"
        id="male"
        value="Nam"
        checked={true}
        label="Nam"
      />
      <RadioGroup name="gioiTinh" id="female" value="Nữ" label="Nữ" />
    </div>
  );
};

export default PersonForm;
export { Radio };
