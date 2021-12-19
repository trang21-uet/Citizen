import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import Table from "../shared/Table";
import Error from "../shared/Error";

const Stat = () => {
  const name = {
    ID: "STT",
    cccd: "CCCD",
    ho: "Họ",
    ten: "Tên",
    ngaySinh: "Ngày Sinh",
    gioiTinh: "Giới tính",
    queQuan: "Quê quán",
    thuongTru: "Thường trú",
    tamTru: "Tạm trú",
    tonGiao: "Tôn giáo",
    trinhDoVanHoa: "Trình độ",
    ngheNghiep: "Nghề nghiệp",
  };
  const auth = useAuth();
  const [data, setData] = useState();

  useEffect(() => {
    const request = async () => {
      document.title = "Citizen - Thông tin";
      await fetch("http://localhost:8000/" + auth.info().type + "/list", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.info().access_token,
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));
    };
    request();
  }, [auth]);

  return <>{data ? <Table name={name} data={data} /> : <Error />}</>;
};

export default Stat;
