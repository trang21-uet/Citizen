import React from "react";
import { useAuth } from "../../auth/AuthProvider";
import InputGroup from "../shared/InputGroup";

const PersonForm = (props) => {
  const auth = useAuth();
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
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
        console.log(error);
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
          />
          <InputGroup
            className="col-sm-5"
            name="ten"
            id="lname"
            label="Tên"
            placeholder="Tên"
            form="person"
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
          />
          <InputGroup
            className="col-sm"
            name="ngaySinh"
            type="date"
            id="dob"
            label="Ngày sinh"
            placeholder="2001-12-31"
            form="person"
          />
        </div>
        <InputGroup
          name="queQuan"
          id="que"
          label="Quê quán"
          placeholder="Hà Nội"
          form="person"
        />
        <InputGroup
          name="thuongTru"
          id="thuong"
          label="Thường trú"
          placeholder="Hà Nội"
          form="person"
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
          />
          <InputGroup
            className="col-sm"
            name="trinhDoVanHoa"
            id="level"
            label="Trình độ văn hoá"
            placeholder="12/12"
            form="person"
          />
          <InputGroup
            className="col-sm"
            name="ngheNghiep"
            id="job"
            label="Nghề nghiệp"
            placeholder="Sinh viên"
            form="person"
          />
        </div>
      </div>

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
      <div className="form-check form-check-inline pt-2">
        <input
          className="form-check-input"
          type="radio"
          name="gioiTinh"
          id="male"
          value="Nam"
          defaultChecked
        />
        <label htmlFor="male" className="form-check-label">
          Nam
        </label>
      </div>
      <div className="form-check form-check-inline pt-2 mb-4">
        <input
          className="form-check-input"
          type="radio"
          name="gioiTinh"
          id="female"
          value="Nữ"
        />
        <label htmlFor="female" className="form-check-label">
          Nữ
        </label>
      </div>
    </div>
  );
};

export default PersonForm;
export { Radio };
