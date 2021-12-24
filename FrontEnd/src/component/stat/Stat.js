import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import Error from "../shared/Error";

const Stat = () => {
  const fields = {
    cccd: "CMT/CCCD",
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

  return data.length ? (
    <div className="container">
      <h2 className="my-4 gi">Thông tin người dân</h2>
      <StatTable fields={fields} data={data} />
      <p className="text-muted my-4">
        (Bấm vào hàng của bảng để xem thông tin chi tiết).
      </p>
    </div>
  ) : (
    <Error status="nothing" />
  );
};

const StatTable = ({ data, fields }) => {
  const need = Object.keys(fields);
  let heads = [];
  heads.push(
    <th key="stt" scope="col">
      STT
    </th>
  );
  heads.push(
    <th key="fullName" scope="col">
      Họ và tên
    </th>
  );
  let rows = [];
  for (let key in data[0]) {
    need.includes(key) &&
      heads.push(
        <th key={key} scope="col">
          {fields[key]}
        </th>
      );
  }

  for (const key in data) {
    let cells = [];
    cells.push(<td key="stt">{rows.length + 1}</td>);
    cells.push(
      <td key="fullName">{data[key].ho.concat(" ", data[key].ten)}</td>
    );
    for (const a in data[key]) {
      need.includes(a) && cells.push(<td key={a}>{data[key][a]}</td>);
    }
    rows.push(
      <tr
        key={key}
        onClick={() => {
          window.open("/statistic/" + data[key].ID, "_blank");
        }}
      >
        {cells}
      </tr>
    );
  }

  return (
    <table className="stat table table-light table-bordered table-striped">
      <thead>
        <tr>{heads}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Stat;
