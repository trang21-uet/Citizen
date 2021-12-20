import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import Table from "../shared/Table";
import Error from "../shared/Error";

const Profile = () => {
  const name = {
    ID: "ID",
    tenTK: "Tên tài khoản",
  };
  const auth = useAuth();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const request = async () => {
    document.title = "Citizen - Quản lý";
    await fetch("http://localhost:8000/" + auth.info().type + "/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth.info().access_token,
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          throw data.message;
        } else {
          setData([data]);
        }
      })
      .catch((error) => setError(error));
  };

  useEffect(() => {
    request();
  }, []);

  return data ? <Table name={name} data={data} /> : <Error status={error} />;
};

export default Profile;
