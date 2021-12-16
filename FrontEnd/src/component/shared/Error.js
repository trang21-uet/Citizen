import React from "react";

const Error = ({ status }) => {
  return (
    <>
      {status !== 404 && (
        <p className="text-danger">
          {status === 401 && "Tên đăng nhập hoặc mật khẩu không đúng!"}
          {status === "Passwords not match" && "Mật khẩu không trùng khớp!"}
        </p>
      )}

      {status === 404 && <NotFound />}
    </>
  );
};

const NotFound = () => {
  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="gi text-dark text-opacity-75">404 NOT FOUND</h1>
      <img
        src="https://emoji.gg/assets/emoji/6675-paimon-asleep.png"
        alt="Not Found"
      />
      <h3 className="gi text-dark text-opacity-50 px-3">
        How about we explore the area ahead of us later ?
      </h3>
    </div>
  );
};

export default Error;
