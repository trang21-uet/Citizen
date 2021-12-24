import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import InfoGroup from "../shared/InfoGroup";
import InputGroup from "../shared/InputGroup";
import Modal from "../shared/Modal";
import { Radio } from "../signup/PersonForm";
import Error from "../shared/Error";

const Citizen = () => {
  const { id } = useParams();
  const auth = useAuth();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const request = async () => {
    document.title = "Citizen - Thông tin người dân";
    await fetch("http://localhost:8000/api/list/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth.info().access_token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.status;
        }
      })
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        console.log(data);
        setData(data);
      })
      .catch((error) => setError(error));
  };
  useEffect(() => {
    request();
  }, []);
  return error ? <Error status={error} /> : <CitizenInfo data={data} />;
};

const CitizenInfo = ({ data }) => {
  const [selectedField, setSelectedField] = useState("cccd");
  const fields = {
    cccd: "Số CMT/CCCD",
    ngaySinh: "Ngày Sinh",
    gioiTinh: "Giới tính",
    queQuan: "Quê quán",
    thuongTru: "Nơi thường trú",
    tamTru: "Nơi tạm trú",
    tonGiao: "Tôn giáo",
    trinhDoVanHoa: "Trình độ văn hoá",
    ngheNghiep: "Nghề nghiệp",
  };
  let info = [];
  data &&
    info.push(
      <InfoGroup
        key="fullName"
        label="Họ và tên"
        value={data.ho.concat(" ", data.ten)}
        onClick={() => setSelectedField("fullName")}
      />
    );

  for (let key in fields) {
    data &&
      info.push(
        <InfoGroup
          key={key}
          label={fields[key]}
          value={data[key]}
          onClick={() => {
            setSelectedField(key);
            console.log(key);
          }}
        />
      );
  }
  return (
    <div className="container my-5 p-3 rounded border">
      <h2 className="mb-5 gi">Thông tin chi tiết</h2>
      {info}
      <Modal label="Cập nhật thông tin" id="modify-modal">
        <ModifyForm fields={fields} oldData={data} target={selectedField} />
      </Modal>
      <Modal label="Xoá thông tin người dân?" id="delete-modal">
        <DeleteForm target={data} />
      </Modal>
      <div className="text-center">
        <button
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#delete"
        >
          Xoá tất cả thông tin
        </button>
      </div>
    </div>
  );
};

const ModifyForm = ({ fields, oldData, target }) => {
  const auth = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    fields.ho = "Họ";
    fields.ten = "Tên";
    const formData = new FormData(event.currentTarget);
    let data = {};
    for (const key in fields) {
      data[key] = oldData[key];
    }

    if (target === "fullName") {
      data.ho = formData.get("fname").trim();
      data.ten = formData.get("lname").trim();
    } else {
      data[target] = formData.get(target).trim();
    }

    await fetch("http://localhost:8000/api/update/" + oldData.ID, {
      method: "PUT",
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
    <form onSubmit={handleSubmit} id="modify-modal-form">
      {!["fullName", "gioiTinh"].includes(target) && (
        <InputGroup
          label={fields[target]}
          type={target === "ngaySinh" ? "date" : ""}
          form="modify-modal"
          name={target}
          id={target}
          placeholder={fields[target]}
        />
      )}

      {target === "fullName" && (
        <div className="row">
          <InputGroup
            className="col-4"
            name="ho"
            id="fname"
            label="Họ"
            form="modify-modal"
            placeholder="Họ"
          />
          <InputGroup
            className="col"
            name="ten"
            id="lname"
            label="Tên"
            form="modify-modal"
            placeholder="Tên"
          />
        </div>
      )}
      {target === "gioiTinh" && <Radio id="gioiTinh" />}
    </form>
  );
};

const DeleteForm = ({ target }) => {
  const auth = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:8000/api/delete/" + target.ID, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + auth.info().access_token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
        window.history.back();
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit} id="delete-modal-form">
      Bạn có chắc chắn muốn xoá tất cả thông tin?
    </form>
  );
};

export default Citizen;
