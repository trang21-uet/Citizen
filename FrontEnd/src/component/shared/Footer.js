import React from "react";

const Footer = () => {
  return (
    <footer className="py-3 my-4">
      <p className="text-center text-muted">
        Bài tập lớn môn thiết kế ứng dụng web
      </p>
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <div className="row g-0">
          <Info name="Nguyễn Hải Sơn" msv="19020424" />
          <Info name="Nguyễn Xuân Trang" msv="19020464" />
          <Info name="Triệu Minh Tiến" msv="19020169" />
        </div>
      </ul>
    </footer>
  );
};

const Info = ({ name, msv }) => {
  return (
    <>
      <div className="col-6">
        <div className="p-1 border-end text-end">
          {name}
          <i className="bi bi-person-badge ps-2"></i>
        </div>
      </div>
      <div className="col-6">
        <div className="p-1 border-start">{msv}</div>
      </div>
    </>
  );
};

export default Footer;
