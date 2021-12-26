import React from "react";

const Footer = () => {
  return (
    <footer className="py-3 my-4 ps-5 pe-5">      
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <Info name="Nguyễn Hải Sơn" msv="https://www.facebook.com/son.nguyenhai.9440/" />
        <Info name="Nguyễn Xuân Trang" msv="https://www.facebook.com/trang21.uet" />
        <Info name="Triệu Minh Tiến" msv="https://www.facebook.com/TmT.Ls" />        
      </ul>
      <p className="text-center text-muted">
        Bài tập lớn môn thiết kế ứng dụng web
      </p>
    </footer>
  );
};

const Info = ({ name, msv }) => {
  return (
    <>
      <li class="nav-item"><a href={msv} class="nav-link px-2 text-muted">{name}</a></li>
    </>
  );
};

export default Footer;
