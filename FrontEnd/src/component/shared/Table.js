import React from "react";

const Table = ({ data, fields, clickable, className }) => {
  const need = Object.keys(fields);
  let heads = [];
  let rows = [];
  for (let key in data[0]) {
    need.includes(key) &&
      heads.push(
        <th key={key} scope="col">
          {fields[key]}
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
    <table
      className={
        className +
        " container table table-light table-bordered table-striped mt-3"
      }
    >
      <thead>
        <tr>{heads}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
