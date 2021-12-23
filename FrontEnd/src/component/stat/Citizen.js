import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import InfoGroup from "../shared/InfoGroup";

const Citizen = () => {
  const { id } = useParams();
  const auth = useAuth();
  const [data, setData] = useState();
  const request = async () => {
    document.title = "Citizen - Thông tin người dân";
    await fetch("http://localhost:8000/" + auth.info().type + "/list/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth.info().access_token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.json().error;
        }
      })
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    request();
  }, []);
  return <CitizenInfo data={data} />;
};

const CitizenInfo = ({ data }) => {
  const name = {
    ID: "ID",
    cccd: "CCCD",
    ngaySinh: "Ngày Sinh",
    gioiTinh: "Giới tính",
    queQuan: "Quê quán",
    thuongTru: "Thường trú",
    tamTru: "Tạm trú",
    tonGiao: "Tôn giáo",
    trinhDoVanHoa: "Trình độ",
    ngheNghiep: "Nghề nghiệp",
  };
  let info = [];
  data &&
    info.push(
      <InfoGroup
        key="fullName"
        label="Họ và tên"
        value={data.ho.concat(" ", data.ten)}
      />
    );

  for (let key in name) {
    data &&
      info.push(<InfoGroup key={key} label={name[key]} value={data[key]} />);
  }
  return (
    <div className="container">
      <h2 className="my-3 gi">Thông tin chi tiết</h2>
      {info}
    </div>
  );
};
export default Citizen;
