import React from "react";

const Info = (props) => {
  return (
    <div className={props.className}>
      <Logo className="my-3">citizen</Logo>
      <Desc className="fs-4">Hệ thống điều tra dân số</Desc>
    </div>
  );
};

const Logo = (props) => {
  return (
    <div className="text-center">
      <span className={props.className + " logo-big"}>{props.children}</span>
    </div>
  );
};

const Desc = (props) => {
  return (
    <div className="text-center">
      <span className={props.className + " desc"}>{props.children}</span>
    </div>
  );
};

export default Info;
