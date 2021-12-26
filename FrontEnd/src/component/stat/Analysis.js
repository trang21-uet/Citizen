import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { RadioGroup } from "../shared/InputGroup";
import { Chart } from "react-google-charts";
import InfoGroup from "../shared/InfoGroup";

const Analysis = ({ data }) => {
  const [content, setContent] = useState([]);
  const [children, setChildren] = useState({});
  const auth = useAuth();
  const child = {
    A1: ["maTinh", "tenTinh"],
    A2: ["maHuyen", "tenHuyen"],
    A3: ["maXa", "tenXa"],
    B1: ["maThon", "tenThon"],
  };

  const request = async () => {
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
          // console.log(data);
          let childName = {};
          data.forEach((element) => {
            childName[element[child[auth.info().type][0]]] =
              element[child[auth.info().type][1]];
          });
          // console.log(childName);
          setChildren({ ...childName });
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => auth.info().type !== "B1" && request(), []);

  const handleChange = (event) => {
    const field = event.target.value;
    if (field === "place") {
      setContent(<PopulationChart data={data} children={children} />);
    } else {
      setContent(<AgeChart data={data} />);
    }
  };

  return (
    <div className="border-top py-3">
      <h2 className="gi">Phân tích dữ liệu</h2>
      <strong className="me-3">Phân tích theo:</strong>
      <RadioGroup
        name="field"
        id="address"
        value="place"
        label="Nơi khai báo"
        onChange={handleChange}
      />
      <RadioGroup
        name="field"
        id="level"
        value="trinhDoVanHoa"
        label="Độ tuổi"
        onChange={handleChange}
      />
      {content}
    </div>
  );
};

const PopulationChart = ({ data, children }) => {
  const auth = useAuth();

  let counter = [];
  let result = [["Địa phương", "Số dân"]];
  Object.keys(children).forEach((id) => {
    counter = [];
    counter = data.map((person) => {
      if (auth.info().type === "B1") {
        if (person.B2 === id) {
          return 1;
        }
      } else if (person.B1.slice(0, id.length) === id) {
        return 1;
      }
      return 0;
    });
    result.push([children[id], counter.filter((x) => x === 1).length]);
  });
  console.log(result);

  return (
    <div className="top-50 start-50">
      <Chart
        width={"900px"}
        height={"500px"}
        text-align="center"
        chartType="BarChart"
        loader={<div>Đang tải biểu đồ</div>}
        data={result}
        options={{
          hAxis: {
            title: "Số người"
          },
          vAxis: {
            title: "Địa phương"
          },
          title: "Biểu đồ dân số của từng vùng",
          animation: {
            startup: true,
            easing: 'inAndOut',
            duration: 1000,
          },
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

const AgeChart = ({ data }) => {
  const treCon = (data) => {
    var temp = [];
    var today = new Date();
    data.forEach((person) => {
      var birthDate = new Date(person.ngaySinh);
      var age = today.getFullYear() - birthDate.getFullYear();
      if (age <= 14) {
        temp.push(person);
      }
    });
    return temp.length;
  };

  const nguoiLaoDong = (data) => {
    var temp = [];
    var today = new Date();
    data.forEach((person) => {
      var birthDate = new Date(person.ngaySinh);
      var age = today.getFullYear() - birthDate.getFullYear();
      if (age > 14 && age <= 59) {
        temp.push(person);
      }
    });
    return temp.length;
  };

  const nguoiGia = (data) => {
    var temp = [];
    var today = new Date();
    data.forEach((person) => {
      var birthDate = new Date(person.ngaySinh);
      var age = today.getFullYear() - birthDate.getFullYear();
      if (age > 60) {
        temp.push(person);
      }
    });
    return temp.length;
  };

  return (
    <Chart
      className="top-50 start-50 mx-auto"
      width={"900px"}
      height={"500px"}
      chartType="PieChart"
      loader={<div>Đang tải biểu đồ</div>}
      data={[
        ["Độ tuổi", "Age"],
        ["0 - 14", treCon(data)],
        ["15 - 59", nguoiLaoDong(data)],
        ["> 60", nguoiGia(data)],
      ]}
      options={{
        title: "Biểu đồ về độ tuổi của người dân",
      }}
      rootProps={{ "data-testid": "1" }}
    />
  );
};

export default Analysis;
