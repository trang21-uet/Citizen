import React from "react";

const Table = ({ data, name }) => {
  const need = Object.keys(name);
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
    rows.push(<tr key={key}>{cells}</tr>);
  }

  return (
    <table className="table table-light table-bordered table-striped mt-3">
      <thead>
        <tr>{heads}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
