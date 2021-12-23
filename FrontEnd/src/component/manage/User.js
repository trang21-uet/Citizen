import React from "react";
import InfoGroup from "../shared/InfoGroup";

const User = ({ data }) => {
  const request = async () => {
    await fetch("http://localhost:8000/api/trangthaiquyen", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth.info().access_token,
        Accept: "application/json",
      },
    });
  };
  return <></>;
};

export default UserProfile;
