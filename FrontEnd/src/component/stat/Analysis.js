import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { RadioGroup } from "../shared/InputGroup";
import { Chart } from "react-google-charts";

const Analysis = ({ data }) => {
  const [info, setInfo] = useState([]);
  const [chilren, setChildren] = useState([]);
  const [age, setAge] = useState([]);
  const auth = useAuth();
  const childName = {
    A1: "maTinh",
    A2: "maHuyen",
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
          console.log(data);
          let child = [];
          data.forEach((element) => {
            child.push(element[childName[auth.info().type]]);
          });
          setChildren(child);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => ["A1", "A2"].includes(auth.info().type) && request(), []);

  const handleChange = (event) => {
    const field = event.target.value;
    if (field === "place") {
      if (["A1", "A2"].includes(auth.info().type)) {
      } else {
      }
    } else {
    }
  };

  const treCon = (data) => {
    var temp = [];
    var today = new Date();
    data.forEach(person => {
      var birthDate = new Date(person.ngaySinh);
      var age = today.getFullYear() - birthDate.getFullYear();
      if (age <= 14) {
        temp.push(person);
      }
    });
    return temp.length;
  }

  const nguoiLaoDong = (data) => {
    var temp = [];
    var today = new Date();
    data.forEach(person => {
      var birthDate = new Date(person.ngaySinh);
      var age = today.getFullYear() - birthDate.getFullYear();
      if (age > 14 && age <= 59) {
        temp.push(person);
      }
    });
    return temp.length;
  }

  const nguoiGia = (data) => {
    var temp = [];
    var today = new Date();
    data.forEach(person => {
      var birthDate = new Date(person.ngaySinh);
      var age = today.getFullYear() - birthDate.getFullYear();
      if (age > 60) {
        temp.push(person);
      }
    });
    return temp.length;
  }

  return (
    <div className="border-top py-3">
      <h2 className="gi">Phân tích dữ liệu</h2>
      <strong className="me-3">Phân tích theo:</strong>
      <RadioGroup
        name="field"
        id="address"
        value="place"
        label="Nơi khai báo"
        checked={true}
        onChange={handleChange}
      />
      <RadioGroup
        name="field"
        id="level"
        value="trinhDoVanHoa"
        label="Độ tuổi"
        onChange={handleChange}
      />


      {/* độ tuổi */}
      <Chart
        class="mx-auto"
        width={'900px'}
        height={'500px'}
        chartType="PieChart"
        loader={<div>Đang tải biểu đồ</div>}
        data={[
          ['Độ tuổi', 'Age'],
          ['0 - 14', treCon(data)],
          ['15 - 59', nguoiLaoDong(data)],
          ['> 60', nguoiGia(data)],
        ]}
        options={{
          title: 'Biểu đồ về độ tuổi của người dân',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

export default Analysis;
