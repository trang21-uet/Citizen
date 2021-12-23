import React from "react";

const InfoGroup = ({ label, value }) => {
  return (
    <div className="mb-4">
      <h2>{label}</h2>
      {value}
    </div>
  );
};

export default InfoGroup;
