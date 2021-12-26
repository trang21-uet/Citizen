import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import Analysis from "./Analysis";
import Error from "../shared/Error";

const Stat = () => {
  const navigate = useNavigate();
  const fields = {
    cccd: "CMT/CCCD",
    ngaySinh: "Ngày Sinh",
    gioiTinh: "Giới tính",
    thuongTru: "Địa chỉ",
    trinhDoVanHoa: "Trình độ học vấn",
  };
  const auth = useAuth();
  const [data, setData] = useState([]);

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

  useEffect(() => {
    request();
  }, [auth]);

  return data.length ? (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h2 className="my-4 gi">Thông tin người dân</h2>
        <SortSelector
          className="w-auto align-self-end"
          data={data}
          setData={(data) => {
            setData(data);
          }}
        />
      </div>
      <StatTable
        fields={fields}
        data={data}
        navigate={(url) => {
          navigate(url);
        }}
      />
      <p className="text-muted my-4">
        (Bấm vào hàng của bảng để xem thông tin chi tiết).
      </p>
      <Analysis data={data} />
    </div>
  ) : (
    <Error status="nothing" />
  );
};

const SortSelector = ({ className, data, setData }) => {
  const [value, setValue] = useState("0");

  const handleChange = (event) => {
    const key = event.target.value;
    setValue(key);
    if (key === "0") {
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          if (data[i].ID > data[j].ID) {
            const temp = data[i];
            data[i] = data[j];
            data[j] = temp;
          }
        }
      }
      setData(new Array(...data));
    } else {
      switch (key) {
        case "fullName":
          for (let i = 0; i < data.length; i++) {
            for (let j = i + 1; j < data.length; j++) {
              if (data[i].ho > data[j].ho) {
                const temp = data[i];
                data[i] = data[j];
                data[j] = temp;
              }
            }
          }
          setData(new Array(...data));
          break;
        case "age":
          for (let i = 0; i < data.length; i++) {
            for (let j = i + 1; j < data.length; j++) {
              var d1 = new Date(data[i].ngaySinh);
              var d2 = new Date(data[j].ngaySinh);
              if (d1 > d2) {
                const temp = data[i];
                data[i] = data[j];
                data[j] = temp;
              }
            }
          }
          setData(new Array(...data));
          break;
        case "level":
          for (let i = 0; i < data.length; i++) {
            for (let j = i + 1; j < data.length; j++) {
              var t1;
              if (parseInt(data[i].trinhDoVanHoa)) {
                t1 = parseInt(data[i].trinhDoVanHoa);
              } else {
                t1 = 14;
              }
              var t2;
              if (parseInt(data[i].trinhDoVanHoa)) {
                t2 = parseInt(data[j].trinhDoVanHoa);
              } else {
                t2 = 14;
              }
              if (t1 > t2) {
                const temp = data[i];
                data[i] = data[j];
                data[j] = temp;
              }
            }
          }
          setData(new Array(...data));
          break;
        default:
          break;
      }
    }
  };
  return (
    <div className="d-flex">
      <span className="my-auto me-2">Sắp xếp theo:</span>
      <select
        className={className + " form-select p-2 pe-5 my-auto"}
        value={value}
        onChange={handleChange}
      >
        <option value="0">Mặc định</option>
        <option value="fullName">Tên</option>
        <option value="age">Tuổi</option>
        <option value="level">Trình độ học vấn</option>
      </select>
    </div>
  );
};

const StatTable = ({ data, fields, navigate }) => {
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
          navigate("/statistic/" + data[key].ID);
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
