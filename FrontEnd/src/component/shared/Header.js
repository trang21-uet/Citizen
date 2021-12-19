import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import "../../assets/pdf/PDT.pdf";
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg py-0">
      <div className="container">
        <Link to="/" className="navbar-brand logo-small text-dark">
          citizen
        </Link>
        <button className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Navbar id="navmenu"></Navbar>
      </div>
    </nav>
  );
};

const Navbar = (props) => {
  const paths = useAuth().paths;
  const type = useAuth().info().type;
  return (
    <div className="navbar-collapse" id={props.id}>
      <ul className="navbar-nav ms-auto">
        <NavItem className="bi bi-person-circle" to={paths.profile}>
          Thông tin tài khoản
        </NavItem>
        <NavItem className="bi bi-person-plus-fill" to={paths.signup}>
          {["b1", "b2"].includes(type)
            ? "Nhập thông tin người dân"
            : "Cấp tài khoản mới"}
        </NavItem>
        <NavItem className="bi bi-people-fill" to={paths.manage}>
          Quản lý tài khoản
        </NavItem>
        <NavItem className="bi bi-graph-up-arrow" to={paths.stat}>
          Dữ liệu dân số
        </NavItem>
        <NavItem className="bi bi-download" to={paths.down}>
          Mẫu Phiếu
        </NavItem>
        <SignOut className="bi bi-box-arrow-right"></SignOut>
      </ul>
    </div>
  );
};

const NavItem = (props) => {
  return (
    <li
      className="nav-item text-end"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      title={props.children}
    >
      <Link
        to={props.to}
        className="py-1 py-lg-2 text-dark text-decoration-none"
      >
        <span className="gi d-lg-none lh-base fw-light ps-3">
          {props.children}
        </span>
        <i className={props.className + " px-3 fs-5"}></i>
      </Link>
    </li>
  );
};

const SignOut = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const logout = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:8000/" + auth.info().type + "/logout", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth.info().access_token,
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        auth.logout(() => {
          sessionStorage.removeItem("info");
          navigate("/login", { replace: true });
          alert("Bạn đã đăng xuất thành công!");
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <li
      className="nav-item text-end"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      title="Đăng xuất"
    >
      <a
        href="/signout"
        onClick={logout}
        className="py-1 py-lg-2 text-decoration-none text-dark"
      >
        <span className="gi d-lg-none lh-base fw-light ps-3">Đăng xuất</span>
        <span className={"px-3 fs-5 " + props.className}></span>
      </a>
    </li>
  );
};

export default Header;
