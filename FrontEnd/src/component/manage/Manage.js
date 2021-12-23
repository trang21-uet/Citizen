import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import InputGroup from "../shared/InputGroup";
import Error from "../shared/Error";

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
  };
  const auth = useAuth();
  const [data, setData] = useState([]);
  const request = async () => {
    document.title = "Citizen - Quản lý";
    await fetch("http://localhost:8000/" + auth.info().type + "/quanly", {
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
      .catch((error) => console.log(error));
  };

  useEffect(() => {
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
  const [selectedChild, setSelectedChild] = useState();
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
      need.includes(i) && cells.push(<td key={i}>{data[key][i]}</td>);
    }
    cells.push(
      <td key="changePermission">
        <button
          className="btn btn-link"
          onClick={() => {
            setSelectedChild(data[key][name[auth.info().type]]);
          }}
          data-bs-toggle="modal"
          data-bs-target="#set-permission-modal"
        >
          Đặt quyền khai báo
        </button>
      </td>
    );
    rows.push(<tr key={key}>{cells}</tr>);
  }

  return (
    <div className="container">
      <table className="manage table table-light table-bordered table-striped mt-3">
        <thead>
          <tr>{heads}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>

      <div className="modal fade" id="set-permission-modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title fs-5">Đặt lại thời gian khai báo</p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <SetPermissionForm target={selectedChild} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Huỷ bỏ
              </button>
              <button
                disabled
                type="submit"
                form="modal-form"
                className="btn btn-success"
                id="modal-btn"
              >
                Lưu lại
              </button>
            </div>
          </div>
        </div>
      </div>
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
        .then((data) => alert(data.message))
        .catch((error) => console.log(error));
    }
  };

  const handleChange = () => {};

  return (
    <form onSubmit={handleSubmit} className="row" id="modal-form">
      <div className="col">
        <InputGroup
          id="startPermission"
          name="startPermission"
          label="Bắt đầu"
          type="datetime-local"
          form="modal"
        />
      </div>
      <div className="col">
        <InputGroup
          id="endPermission"
          name="endPermission"
          label="Kết thúc"
          type="datetime-local"
          form="modal"
        />
      </div>
      {error ? <Error status={error} /> : <></>}
    </form>
  );
};

export default Manage;
