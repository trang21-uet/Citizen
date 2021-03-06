import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import InputGroup from "../shared/InputGroup";
import Modal from "../shared/Modal";
import Error from "../shared/Error";
import { toggleBtn, checkInputs, toggleModal } from "../shared/handler";

const Manage = () => {
  const fields = {
    maTinh: "Tên tài khoản",
    tenTinh: "Tên tỉnh",
    maHuyen: "Tên tài khoản",
    maXa: "Tên tài khoản",
    maThon: "Tên tài khoản",
    tenHuyen: "Tên huyện",
    tenXa: "Tên xã",
    tenThon: "Tên thôn",
    quyen: "Quyền khai báo",
    trangThai: "Trạng thái nhập liệu",
  };
  const auth = useAuth();
  const [data, setData] = useState([]);
  const request = async () => {
    ["B1", "B2"].includes(auth.info().type) &&
      (await fetch("http://localhost:8000/" + auth.info().type + "/quanly", {
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
            data.forEach((element) => {
              let end = new Date(element.endPermission);
              let now = new Date();
              element.quyen = end > now ? "Có" : "Không";
            });
            console.log(data);
            setData(data);
          }
        })
        .catch((error) => console.log(error)));

    ["A1", "A2", "A3"].includes(auth.info().type) &&
      (await fetch("http://localhost:8000/" + auth.info().type + "/trangthai", {
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
            console.log(data);
            const dataArray = Object.keys(data).map((key) => data[key]);
            dataArray.forEach((element) => {
              let end = new Date(element.endPermission);
              let now = new Date();
              element.quyen = end > now ? "Có" : "Không";
              element.trangThai = element.trangThai == 1
                ? "Hoàn thành"
                : "Chưa hoàn thành";
            });
            console.log(dataArray);
            setData(dataArray);
          }
        })
        .catch((error) => console.log(error)));
  };

  useEffect(() => {
    document.title = "Citizen - Quản lý";
    request();
  }, [auth]);
  return (
    <>
      {data.length ? (
        <UsersTable fields={fields} data={data} />
      ) : (
        <Error status="nothing" />
      )}
    </>
  );
};

const UsersTable = ({ data, fields }) => {
  const need = Object.keys(fields);
  const name = {
    A1: "maTinh",
    A2: "maHuyen",
    A3: "maXa",
    B1: "maThon",
  };
  const [target, setTarget] = useState();
  const auth = useAuth();

  let heads = [];
  let rows = [];
  for (let key in data[0]) {
    need.includes(key) &&
      heads.push(
        <th key={key} scope="col">
          {fields[key]}
        </th>
      );
  }
  heads.push(
    <th key="options" scope="col">
      Tuỳ chọn
    </th>
  );

  for (let key in data) {
    let cells = [];
    for (let i in data[key]) {
      need.includes(i) &&
        cells.push(
          <td key={i} className="align-middle">
            {data[key][i]}
          </td>
        );
    }
    cells.push(
      <td key="changePermission" className="align-middle">
        <button
          className="btn bi bi-shield-fill-check"
          onClick={() => {
            setTarget(data[key][name[auth.info().type]]);
          }}
          data-bs-toggle="modal"
          data-bs-target="#set-permission-modal"
        />
        <button
          className="btn bi bi-key-fill"
          onClick={() => {
            setTarget(data[key][name[auth.info().type]]);
          }}
          data-bs-toggle="modal"
          data-bs-target="#reset-password-modal"
        />
      </td>
    );
    rows.push(<tr key={key}>{cells}</tr>);
  }

  return (
    <div className="container table-responsive">
      <h2 className="gi my-4">Thông tin tài khoản</h2>
      <table className="manage table table-light table-bordered table-striped mt-3">
        <thead>
          <tr>{heads}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>

      <Modal label="Đặt lại thời gian khai báo" id="set-permission-modal">
        <SetPermissionForm target={target} />
      </Modal>

      <Modal
        label="Đặt thời gian khai báo thành công!"
        type="alert"
        id="set-permission-alert"
      ></Modal>

      <Modal label="Cấp lại mật khẩu" id="reset-password-modal">
        <ResetPasswordForm target={target} />
      </Modal>

      <Modal
        label="Cấp lại mật khẩu thành công"
        type="alert"
        id="reset-password-alert"
      ></Modal>
    </div>
  );
};

const SetPermissionForm = ({ target }) => {
  const [error, setError] = useState();
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const start = formData
      .get("startPermission")
      .replace("T", " ")
      .concat(":00");
    const end = formData.get("endPermission").replace("T", " ").concat(":00");

    if (start > end) {
      setError("invalid time");
    } else {
      const child = {
        A1: "A2",
        A2: "A3",
        A3: "B1",
        B1: "B2",
      };
      const data = {
        startPermission: start,
        endPermission: end,
        [child[auth.info().type]]: target,
      };
      console.log(data);
      await fetch("http://localhost:8000/" + auth.info().type + "/quyen", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + auth.info().access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            throw data.error;
          }
          document.querySelectorAll("form input").forEach((element) => {
            element.value = "";
          });

          toggleModal("set-permission-alert", true);
        })
        .catch((error) => alert(error));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="row"
      id="set-permission-modal-form"
    >
      <div className="col">
        <InputGroup
          id="startPermission"
          name="startPermission"
          label="Bắt đầu"
          type="datetime-local"
          form="set-permission-modal"
        />
      </div>
      <div className="col">
        <InputGroup
          id="endPermission"
          name="endPermission"
          label="Kết thúc"
          type="datetime-local"
          form="set-permission-modal"
        />
      </div>
      {error ? <Error status={error} /> : <></>}
    </form>
  );
};

const ResetPasswordForm = ({ target }) => {
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(target);
    const data = JSON.stringify({
      MK: document.getElementById("pass").value.trim(),
      user: target,
    });

    await fetch("http://localhost:8000/api/resetpassword", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + auth.info().access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          throw "invalid password";
        } else {
          throw response.json();
        }
      })
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        document.querySelectorAll("form input").forEach((element) => {
          element.value = "";
        });
        toggleModal("reset-password-alert", true);
        console.log(data);
      })
      .catch((error) => setError(error));
  };

  const checkPass = () => {
    const pass = document.getElementById("pass").value;
    const repass = document.getElementById("repass").value;
    if (pass !== repass) {
      setError("passwords not match");
      toggleBtn("reset-password-modal-btn", false);
    } else {
      setError(null);
      toggleBtn(
        "reset-password-modal-btn",
        checkInputs("reset-password-modal-form")
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} id="reset-password-modal-form">
      <InputGroup
        id="pass"
        name="MK"
        label="Mật khẩu"
        type="password"
        placeholder="Nhập mật khẩu"
        onChange={checkPass}
      />
      <InputGroup
        id="repass"
        name="MK"
        label="Nhập lại mật khẩu"
        type="password"
        placeholder="Nhập lại mật khẩu"
        onChange={checkPass}
      />
      {error ? <Error status={error} /> : <></>}
    </form>
  );
};

export default Manage;
