import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import InfoGroup from "../shared/InfoGroup";
import Error from "../shared/Error";
import Modal from "../shared/Modal";

const Profile = () => {
  const auth = useAuth();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const request = async () => {
    document.title = "Citizen - Thông tin tài khoản";
    await fetch("http://localhost:8000/api/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth.info().access_token,
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        } else {
          data.type = auth.info().type;
          setData(data);
        }
      })
      .catch((error) => setError(error));
  };

  useEffect(() => {
    request();
  }, []);

  return data ? <ProfileInfo data={data} /> : <Error status={error} />;
};

const ProfileInfo = ({ data }) => {
  const auth = useAuth();
  const [done, setDone] = useState(data.userProfile.trangThai);

  const fields = {
    type: "Loại tài khoản",
    maTinh: "Tên tài khoản",
    maHuyen: "Tên tài khoản",
    maXa: "Tên tài khoản",
    maThon: "Tên tài khoản",
    tenTinh: "Tên tỉnh/thành phố",
    tenHuyen: "Tên quận/huyện",
    tenXa: "Tên xã/phường",
    tenThon: "Tên thôn/bản",
  };
  const managerFields = {
    maTongCuc: "Trực thuộc",
    tenTinh: "Trực thuộc tỉnh",
    tenHuyen: "Trực thuộc huyện",
    tenXa: "Trực thuộc xã",
  };

  let userInfo = [];
  for (const key in fields) {
    data.userProfile[key] &&
      userInfo.push(
        <InfoGroup
          key={key}
          label={fields[key]}
          value={data.userProfile[key]}
        />
      );
  }

  const now = new Date();
  const end = new Date(data.userProfile.endPermission);
  userInfo.push(
    <InfoGroup
      key="permission"
      label="Quyền khai báo thông tin"
      value={now < end ? "Có" : "Không"}
    />
  );

  auth.info().type === "B1" &&
    userInfo.push(
      <InfoGroup
        key="complete"
        label="Trạng thái thu thập dữ liệu"
        value={done ? "Hoàn thành" : "Chưa hoàn thành"}
      >
        <button
          className="btn col-1 bi bi-pencil-square"
          data-bs-toggle="modal"
          data-bs-target="#done-modal"
        ></button>
      </InfoGroup>
    );

  if (data.manager) {
    for (const key in managerFields) {
      data.manager[key] &&
        userInfo.push(
          <InfoGroup
            key={key + "-manager"}
            label={managerFields[key]}
            value={data.manager[key]}
          />
        );
    }
  }

  console.log(data);

  return (
    <div className="container mt-5 p-3 rounded border">
      <h2 className="gi mb-5">Thông tin tài khoản</h2>
      <InfoGroup label="Loại tài khoản" value={data.type.toUpperCase()} />
      {data.type !== "A1" ? (
        userInfo
      ) : (
        <InfoGroup label="Cơ quan" value="Bộ Y tế" />
      )}

      <Modal
        label="Thay đổi trạng thái thu thập dữ liệu"
        id="done-modal"
        type="confirm"
      >
        <SetDoneForm
          state={done}
          setState={(state) => setDone(state)}
          id="done-modal-form"
        />
      </Modal>
    </div>
  );
};

const SetDoneForm = ({ state, setState, id }) => {
  const auth = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = JSON.stringify({
      trangThai: 1 - state,
    });
    await fetch("http://localhost:8000/" + auth.info().type + "/hoanthanh", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + auth.info().access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        } else {
          setState(1 - state);
          alert(data.message);
          console.log(data);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit} id={id}>
      {"Cập nhật trạng thái nhập liệu thành" +
        (state ? " chưa " : " đã ") +
        "hoàn thành?"}
    </form>
  );
};

export default Profile;
export { ProfileInfo };
