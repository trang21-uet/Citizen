import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import Table from "../shared/Table";
import Error from "../shared/Error";

const Manage = () => {
  const name = {
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
        <Table name={name} data={data} />
      ) : (
        <Error status="nothing" />
      )}
    </>
  );
};

export default Manage;
