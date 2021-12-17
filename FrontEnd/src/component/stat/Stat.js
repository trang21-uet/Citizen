import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import Error from "../shared/Error";

const Stat = () => {
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

  return <>{data ? <Table data={data} /> : <Error />}</>;
};

const Table = ({ data }) => {
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
  const need = Object.keys(name);
  let heads = [];
  let rows = [];
  for (let key in data[0]) {
    need.includes(key) &&
      heads.push(
        <th key={key} scope="col">
          {name[key]}
        </th>
      );
  }

  for (let key in data) {
    let cells = [];
    for (let a in data[key]) {
      need.includes(a) && cells.push(<td key={a}>{data[key][a]}</td>);
    }
    rows.push(<tr key={key}>{cells}</tr>);
  }

  return (
    <table className="table table-bordered mt-3">
      <thead>
        <tr>{heads}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Stat;
