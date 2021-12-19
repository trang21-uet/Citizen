import React from "react";
import { useAuth } from "../../auth/AuthProvider";
import InputGroup from "../shared/InputGroup";

const PersonForm = (props) => {
  const auth = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = JSON.stringify({
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
    });

    await fetch("http://localhost:8000/" + auth.info().type + "/insert", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + auth.info().access_token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
      })
      .catch((error) => console.log(error));
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={props.className + " shadow bg-light p-3 rounded"}
      id="person-form"
      autoComplete="off"
    >
      <h3 className="mb-4">Nhập thông tin người dân</h3>
      <InputGroup
        name="ho"
        id="fname"
        label="Họ"
        placeholder="Nguyễn"
        form="person"
      />
      <InputGroup
        name="ten"
        id="lname"
        label="Tên"
        placeholder="Xuân Trang"
        form="person"
      />
      <InputGroup
        name="cccd"
        id="id"
        label="Chứng minh thư/ Căn cước công dân/ Hộ chiếu"
        placeholder="123456789"
        form="person"
      />
      <InputGroup
        name="gioiTinh"
        id="sex"
        label="Giới tính"
        placeholder="Nam"
        form="person"
      />
      <InputGroup
        name="ngaySinh"
        id="dob"
        label="Ngày sinh"
        placeholder="2001-12-31"
        form="person"
      />
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
      <InputGroup
        name="tonGiao"
        id="religion"
        label="Tôn giáo"
        placeholder="Không"
        form="person"
      />
      <InputGroup
        name="trinhDoVanHoa"
        id="level"
        label="Trình độ văn hoá"
        placeholder="12/12"
        form="person"
      />
      <InputGroup
        name="ngheNghiep"
        id="job"
        label="Nghề nghiệp"
        placeholder="Sinh viên"
        form="person"
      />

      <button
        id="person-btn"
        type="submit"
        className="btn shadow rounded w-100 fs-5 py-3"
      >
        Đăng ký
      </button>
    </form>
  );
};

export default PersonForm;
