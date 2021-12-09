import React from "react";

export default function Info(props) {
  return (
    <div className={props.className}>
      <Logo className="my-3">citizen</Logo>
      <Desc className="fs-4">Hệ thống điều tra dân số</Desc>
    </div>
  );
}

function Logo(props) {
  return (
    <div className="text-center">
      <span className={props.className + " logo"}>{props.children}</span>
    </div>
  );
}

function Desc(props) {
  return (
    <div className="text-center">
      <span className={props.className + " desc"}>{props.children}</span>
    </div>
  );
}
