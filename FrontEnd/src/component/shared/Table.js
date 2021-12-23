import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Table = ({ data, name, clickable }) => {
  const need = Object.keys(name);
  const navigate = useNavigate();
  let heads = [];
  let rows = [];
  for (let key in data[0]) {
    need.includes(key) &&
      heads.push(
        <th key={key} scope="col">
          {name[key]}
        </th>
      );
  }

  for (let key in data) {
    let cells = [];
    for (let a in data[key]) {
      need.includes(a) && cells.push(<td key={a}>{data[key][a]}</td>);
    }
    rows.push(
      <tr
        key={key}
        onClick={
          clickable
            ? () => {
                // navigate("/statistic/" + data[key].ID);
                window.open("/statistic/" + data[key].ID, "_blank");
              }
            : () => {}
        }
      >
        {cells}
      </tr>
    );
  }

  return (
    <table className="stat container table table-light table-bordered table-striped mt-3">
      <thead>
        <tr>{heads}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
