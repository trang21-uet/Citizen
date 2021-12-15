import React from "react";

const Error = ({ status }) => {
  return (
    <p className="text-danger">
      {status === 401 && "Tên đăng nhập hoặc mật khẩu không đúng!"}
      {status === "Passwords not match" && "Mật khẩu không trùng khớp!"}
    </p>
  );
};

export default Error;
