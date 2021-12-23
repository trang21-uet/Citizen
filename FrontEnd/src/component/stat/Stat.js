import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import Table from "../shared/Table";
import Error from "../shared/Error";

const Stat = () => {
  const fields = {
    ID: "STT",
    ho: "Họ",
    ten: "Tên",
    cccd: "CCCD",
    ngaySinh: "Ngày Sinh",
    gioiTinh: "Giới tính",
    thuongTru: "Địa chỉ",
  };
  const auth = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const request = async () => {
      document.title = "Citizen - Thông tin";
      await fetch("http://localhost:8000/api/list", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.info().access_token,
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setData(data);
        })
        .catch((error) => console.log(error));
    };
    request();
  }, [auth]);

  return (
    <>
      {data.length ? (
        <Table className="stat" fields={fields} data={data} clickable={true} />
      ) : (
        <Error status="nothing" />
      )}
    </>
  );
};

export default Stat;
