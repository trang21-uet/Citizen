import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import pdf from "../../assets/pdf/PDT.pdf";

const Header = () => {
  const click = () => {
    const togglerBtn = document.getElementsByClassName("navbar-toggler")[0];
    const navMenu = document.getElementById("navmenu");
    togglerBtn.classList.toggle("clicked");
    navMenu.classList.toggle("show");
  };

  return (
    <nav className="navbar navbar-expand-lg py-0 navbar-fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand logo-small text-dark">
          citizen
        </Link>
        <button className="navbar-toggler" onClick={click}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <Navbar id="navmenu"></Navbar>
      </div>
    </nav>
  );
};

const Navbar = (props) => {
  const auth = useAuth();
  const type = useAuth().info().type;
  return (
    <div className="navbar-collapse" id={props.id}>
      <ul className="navbar-nav ms-auto">
        <NavItem className="bi bi-person-circle" to={auth.paths.profile}>
          Thông tin tài khoản
        </NavItem>
        <NavItem className="bi bi-person-plus-fill" to={auth.paths.signup}>
          {["B1", "B2"].includes(type)
            ? "Nhập thông tin người dân"
            : "Cấp tài khoản mới"}
        </NavItem>
        {type === "B2" ? (
          <></>
        ) : (
          <NavItem className="bi bi-people-fill" to={auth.paths.manage}>
            Quản lý tài khoản
          </NavItem>
        )}
        <NavItem className="bi bi-graph-up-arrow" to={auth.paths.stat}>
          Dữ liệu dân số
        </NavItem>
        {["B1", "B2"].includes(auth.info().type) ? (
          <Download className="bi bi-download" />
        ) : null}
        <SignOut className="bi bi-box-arrow-right" />
      </ul>
    </div>
  );
};

const NavItem = (props) => {
  return (
    <li
      className="nav-item d-flex justify-content-end m-1 m-lg-0"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      title={props.children}
    >
      <Link
        to={props.to}
        className="pb-1 py-lg-2 text-dark text-decoration-none"
      >
        <span className="gi d-lg-none lh-base ps-3">{props.children}</span>
        <i className={props.className + " px-3 fs-5"}></i>
      </Link>
    </li>
  );
};

const Download = (props) => {
  return (
    <li
      className="nav-item d-flex justify-content-end m-1 m-lg-0"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      title="Tải mẫu phiếu"
    >
      <a
        href={pdf}
        download
        className="pb-1 py-lg-2 text-decoration-none text-dark"
      >
        <span className="gi d-lg-none lh-base fw-light ps-3">
          Tải mẫu phiếu
        </span>
        <span className={"px-3 fs-5 " + props.className}></span>
      </a>
    </li>
  );
};

const SignOut = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const logout = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:8000/api/logout", {
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
          // alert("Bạn đã đăng xuất thành công!");
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <li
      className="nav-item d-flex justify-content-end m-1 m-lg-0 pb-1"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      title="Đăng xuất"
    >
      <a
        onClick={logout}
        href="/signout"
        className="pb-1 py-lg-2 text-decoration-none text-dark"
      >
        <span className="gi d-lg-none lh-base fw-light ps-3">Đăng xuất</span>
        <span className={"px-3 fs-5 " + props.className}></span>
      </a>
    </li>
  );
};

export default Header;
