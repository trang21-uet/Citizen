import React from "react";
import notFound from "../../assets/img/paimon_sleep.png";
import nothing from "../../assets/img/whymon.png";
import noPermission from "../../assets/img/no permission.png";

const Error = ({ status }) => {
  return (
    <>
      {status === 401 && (
        <p className="text-danger fw-bold">
          Tên đăng nhập hoặc mật khẩu không đúng!
        </p>
      )}

      {status === "passwords not match" && (
        <p className="text-danger fw-bold">Mật khẩu không trùng khớp!</p>
      )}

      {status === "invalid password" && (
        <p className="text-danger fw-bold">
          Mật khẩu phải gồm ít nhất 8 ký tự, trong đó có ít nhất một ký tự số và
          1 ký tự chữ cái!
        </p>
      )}

      {status === "already exists" && (
        <p className="text-danger fw-bold">Tài khoản đã tồn tại!</p>
      )}

      {status === "not found" && (
        <p className="my-3">Không tìm thấy kết quả!</p>
      )}

      {status === "invalid time" && (
        <p className="text-danger fw-bold">Thời gian không hợp lệ</p>
      )}

      {status === "error" && (
        <p className="text-danger fw-bold">Có lỗi xảy ra, vui lòng thử lại</p>
      )}

      {status === "wrong username" && (
        <p className="text-danger fw-bold">Sai định dạng tài khoản</p>
      )}

      {status === "tenDonvi" && (
        <p className="text-danger fw-bold">Sai tên Tỉnh/Thành phố</p>
      )}

      {status === 404 && <NotFound />}
      {status === "nothing" && <NothingHere />}
      {status === "no permission" && <NoPermission />}
    </>
  );
};

const NotFound = () => {
  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="gi text-dark text-opacity-75">404 NOT FOUND</h1>
      <img src={notFound} className="error w-auto py-3" alt="Not Found" />
      <h3 className="gi text-dark text-opacity-50 px-3 text-center">
        How about we explore the area ahead of us later ?
      </h3>
    </div>
  );
};

const NothingHere = () => {
  return (
    <>
      <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1 className="gi text-dark text-opacity-75">Nothing Here</h1>
        <img src={nothing} className="error w-auto py-3" alt="Not Found" />
        <h3 className="gi text-dark text-opacity-50 px-3 text-center">
          How about we explore the area ahead of us later ?
        </h3>
      </div>
    </>
  );
};

const NoPermission = () => {
  return (
    <>
      <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1 className="gi text-dark text-opacity-75">No Permission</h1>
        <img src={noPermission} className="error w-auto py-3" alt="Not Found" />
        <h3 className="gi text-dark text-opacity-50 px-3 text-center">
          How about we explore the area ahead of us later ?
        </h3>
      </div>
    </>
  );
};

export default Error;
