import React from "react";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <span className="navbar-brand logo-small fs-3 text-light">citizen</span>
        <button className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Navbar></Navbar>
      </div>
    </nav>
  );
};

const Navbar = (props) => {
  return (
    <div className="collapse navbar-collapse" id={props.id}>
      <ul className="navbar-nav ms-auto">
        <NavBtn href="#">Thêm</NavBtn>
        <NavBtn href="#">Sửa</NavBtn>
        <NavBtn href="#">Xoá</NavBtn>
      </ul>
    </div>
  );
};

const NavBtn = (props) => {
  return (
    <li className="nav-item">
      <a href={props.href} className="nav-link">
        {props.children}
      </a>
    </li>
  );
};

export default Header;
