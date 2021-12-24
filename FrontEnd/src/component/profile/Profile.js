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
  const fields = {
    type: "Loại tài khoản",
    maTinh: "Tên tài khoản",
    maHuyen: "Tên tài khoản",
    maXa: "Tên tài khoản",
    maThon: "Tên tài khoản",
    tenTinh: "Tên tỉnh/thành phố",
    tenHuyen: "Tên quận/huyện",
    tenXa: "Tên xã/phường",
    tenThon: "Tên thôn/bản",
    trangThai: "Trạng thái thu thập dữ liệu",
  };
  const managerFields = {
    maTongCuc: "Trực thuộc",
    tenTinh: "Trực thuộc tỉnh",
    tenHuyen: "Trực thuộc huyện",
    tenXa: "Trực thuộc xã",
  };

  let userInfo = [];
  for (const key in fields) {
    data.userProfile[key] &&
      userInfo.push(
        <InfoGroup
          key={key}
          label={fields[key]}
          value={data.userProfile[key]}
        />
      );
  }

  const start = new Date(data.userProfile.startPermission);
  const end = new Date(data.userProfile.endPermission);
  userInfo.push(
    <InfoGroup
      key="permission"
      label="Quyền khai báo thông tin"
      value={start < end ? "Có" : "Không"}
    />
  );

  for (const key in managerFields) {
    data.manager[key] &&
      userInfo.push(
        <InfoGroup
          key={key + "-manager"}
          label={managerFields[key]}
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
export { ProfileInfo };
