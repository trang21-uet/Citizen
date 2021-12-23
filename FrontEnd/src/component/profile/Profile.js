import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import InfoGroup from "../shared/InfoGroup";
import Error from "../shared/Error";

const Profile = () => {
  const auth = useAuth();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const request = async () => {
    document.title = "Citizen - Thông tin tài khoản";
    await fetch("http://localhost:8000/api/user", {
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
          data.type = auth.info().type;
          setData(data);
        }
      })
      .catch((error) => setError(error));
  };

  useEffect(() => {
    request();
  }, []);

  return data ? <ProfileInfo data={data} /> : <Error status={error} />;
};

const ProfileInfo = ({ data }) => {
  const name = {
    type: "Loại tài khoản",
    tenTK: "Tên tài khoản",
    tenTinh: "Tên tỉnh",
    tenHuyen: "Tên huyện",
    tenXa: "Tên xã",
    tenThon: "Tên thôn",
    quyen: "Quyền khai báo thông tin",
  };
  const parentName = {
    tenTinh: "Trực thuộc tỉnh",
    tenHuyen: "Trực thuộc huyện",
    tenXa: "Trực thuộc xã",
  };
  let userInfo = [];
  for (let key in data.userProfile) {
    name[key] &&
      userInfo.push(
        <InfoGroup key={key} label={name[key]} value={data.userProfile[key]} />
      );
  }
  for (let key in data.manager) {
    parentName[key] &&
      userInfo.push(
        <InfoGroup
          key={key + "-parent"}
          label={parentName[key]}
          value={data.manager[key]}
        />
      );
  }
  console.log(data);

  return (
    <div className="container mt-4">
      <InfoGroup label="Loại tài khoản" value={data.type.toUpperCase()} />
      {data.type !== "A1" ? (
        userInfo
      ) : (
        <InfoGroup label="Cơ quan" value="Bộ Y tế" />
      )}
    </div>
  );
};

export default Profile;
