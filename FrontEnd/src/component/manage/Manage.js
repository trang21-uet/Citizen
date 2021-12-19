import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import Table from "../shared/Table";
import Error from "../shared/Error";

const Manage = () => {
  const name = {
    maTinh: "ID",
    tenTinh: "Tỉnh",
    quyen: "Quyền khai báo",
  };
  const auth = useAuth();
  const [data, setData] = useState();
  const [error, setError] = useState();
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
          setData(data);
        }
      })
      .catch((error) => setError(error));
  };
  console.log(data);

  useEffect(() => {
    request();
  }, [auth]);
  return (
    <>{data ? <Table name={name} data={data} /> : <Error status={error} />}</>
  );
};

export default Manage;
