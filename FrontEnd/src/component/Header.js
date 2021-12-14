import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

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
  const info = JSON.parse(window.localStorage.getItem("info"));
  const type = info.type;
  return (
    <div className="collapse navbar-collapse" id={props.id}>
      <ul className="navbar-nav ms-auto">
        <NavItem
          className="bi bi-person-circle"
          to={type + "/profile"}
        ></NavItem>
        <NavItem
          className="bi bi-person-plus-fill"
          to={type + "/register"}
        ></NavItem>
        <NavItem className="bi bi-people-fill" to={type + "/manage"}></NavItem>
        <NavItem
          className="bi bi-graph-up-arrow"
          to={type + "/statistic"}
        ></NavItem>
        <DropdownMenu></DropdownMenu>
      </ul>
    </div>
  );
};

const NavItem = (props) => {
  return (
    <li className="nav-item text-sm-end text-md-end">
      <Link
        to={props.to}
        className={"nav-link text-dark fs-5 " + props.className}
      >
        {props.children}
      </Link>
    </li>
  );
};

const DropdownMenu = () => {
  return (
    <>
      <li className="nav-item text-sm-end text-md-end">
        <i
          className="bi bi-caret-down-fill nav-link text-dark fs-5"
          id="dropdownMenuToggler"
          data-bs-toggle="collapse"
          data-bs-target="#dropdownMenu"
        ></i>
      </li>
      <ul className="collapse" id="dropdownMenu">
        <Link to="/" className="dropdown-item">
          Hao
        </Link>
        <Link to="/" className="dropdown-item">
          Pro
        </Link>
        <SignOut className="dropdown-item"></SignOut>
      </ul>
    </>
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
        },
      });
      if (response.ok) {
        return response.json();
      } else {
        throw response.status;
      }
    };

    request("http://localhost:8000/api/" + auth.info().type + "/logout")
      .then((res) => {
        auth.logout(() => {
          window.localStorage.removeItem("info");
          navigate("/login", { replace: true });
          console.log(res);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <span type="button" className={props.className} onClick={logout}>
      Đăng xuất
    </span>
  );
};

export default Header;
