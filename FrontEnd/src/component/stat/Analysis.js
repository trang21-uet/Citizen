import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { RadioGroup } from "../shared/InputGroup";

const Analysis = ({ data }) => {
  const [info, setInfo] = useState([]);
  const [chilren, setChildren] = useState([]);
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
        label="Trình độ học vấn"
        onChange={handleChange}
      />
    </div>
  );
};

export default Analysis;
