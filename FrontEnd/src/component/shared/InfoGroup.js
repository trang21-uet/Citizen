import React from "react";

const InfoGroup = ({ label, value, onClick, children }) => {
  return (
    <div className="mb-4 row border-bottom">
      <h5 className="col-sm-3 text-muted">{label}</h5>
      <p className="col align-self-center">{value}</p>
      {onClick ? (
        <button
          className="btn col-1 bi bi-pencil-square"
          onClick={onClick}
          data-bs-toggle="modal"
          data-bs-target="#modify-modal"
        />
      ) : (
        <></>
      )}
      {children}
    </div>
  );
};

export default InfoGroup;
