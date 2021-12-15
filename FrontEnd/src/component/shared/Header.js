import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg py-0">
      <div className="container">
        <span className="navbar-brand logo-small text-dark">citizen</span>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Navbar id="navmenu"></Navbar>
      </div>
    </nav>
  );
};

const Navbar = (props) => {
  const info = JSON.parse(sessionStorage.info);
  const type = info.type;
  return (
    <div className="collapse navbar-collapse" id={props.id}>
      <ul className="navbar-nav ms-auto">
        <NavItem className="bi bi-person-circle" to={type + "/profile"}>
          Thông tin tài khoản
        </NavItem>
        <NavItem className="bi bi-person-plus-fill" to={type + "/register"}>
          Tạo tài khoản mới
        </NavItem>
        <NavItem className="bi bi-people-fill" to={type + "/manage"}>
          Quản lý tài khoản
        </NavItem>
        <NavItem className="bi bi-graph-up-arrow" to={type + "/statistic"}>
          Dữ liệu dân số
        </NavItem>
        <SignOut className="bi bi-box-arrow-right"></SignOut>
      </ul>
    </div>
  );
};

const NavItem = (props) => {
  return (
    <li className="nav-item text-end">
      <span className="d-lg-none lh-lg">{props.children}</span>
      <Link
        to={props.to}
        className={"px-3 text-dark fs-5 " + props.className}
      ></Link>
    </li>
  );
};

const SignOut = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    const request = async (url) => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.info().access_token,
          Accept: "application/json",
        },
      });
      if (response.ok) {
        return response.json();
      } else {
        throw response.status;
      }
    };

    request("http://localhost:8000/" + auth.info().type + "/logout")
      .then((res) => {
        auth.logout(() => {
          sessionStorage.removeItem("info");
          navigate("/login", { replace: true });
          alert("Bạn đã đăng xuất thành công!");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <li className="nav-item text-end" onClick={logout}>
      <span className="d-lg-none lh-lg">Đăng xuất</span>
      <span className={"px-3 text-dark fs-5 " + props.className}></span>
    </li>
  );
};

export default Header;
