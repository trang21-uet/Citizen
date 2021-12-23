import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
<<<<<<< Updated upstream
=======
import pdf from "../../assets/pdf/PDT.pdf";
import Error from "./Error";
>>>>>>> Stashed changes

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
        <SearchBox />
        <NavItem className="bi bi-person-circle" to={auth.paths.profile}>
          Thông tin tài khoản
        </NavItem>
        <NavItem className="bi bi-person-plus-fill" to={auth.paths.signup}>
          {["b1", "b2"].includes(type)
            ? "Nhập thông tin người dân"
            : "Cấp tài khoản mới"}
        </NavItem>
        <NavItem className="bi bi-people-fill" to={auth.paths.manage}>
          Quản lý tài khoản
        </NavItem>
        <NavItem className="bi bi-graph-up-arrow" to={auth.paths.stat}>
          Dữ liệu dân số
        </NavItem>
<<<<<<< Updated upstream
        <NavItem className="bi bi-file-earmark" to={paths.down}>
          
          Mẫu Phiếu
        </NavItem>
        <SignOut className="bi bi-box-arrow-right"></SignOut>
=======
        {["b1", "b2"].includes(auth.info().type) ? (
          <Download className="bi bi-download" />
        ) : null}
        <SignOut className="bi bi-box-arrow-right" />
>>>>>>> Stashed changes
      </ul>
    </div>
  );
};

const SearchBox = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const auth = useAuth();

  const handleChange = (event) => {
    document
      .getElementsByClassName("search-info")[0]
      .classList.remove("d-none");
    setValue(event.target.value);
    const request = async () => {
      await fetch(
        "http://localhost:8000/" +
          auth.info().type +
          "/list/" +
          event.target.value,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + auth.info().access_token,
            Accept: "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(response.json());
            throw "not found";
          }
        })
        .then((data) => {
          console.log(data);
          setData([data]);
        })
        .catch((error) => setError(error));
    };
    if (event.target.value) {
      request();
    }
  };

  return (
    <li className="d-flex mb-1 search-box justify-content-end position-relative">
      <input
        className="form-control shadow-none"
        type="search"
        id="searchbar"
        onChange={handleChange}
        value={value}
        placeholder="Tìm kiếm..."
        autoComplete="off"
      />
      <div
        tabIndex={0}
        className="search-info text-dark position-absolute top-100 border border-top-0 rounded-bottom end-0 text-center"
      >
        {data.length ? <SearchResult data={data} /> : <Error status={error} />}
      </div>
    </li>
  );
};

const SearchResult = ({ data }) => {
  let info = [];
  for (let user of data) {
    info.push(
      <li
        key={JSON.stringify(user)}
        className="row search-result border-bottom py-3 m-0 gi"
        onClick={() => {
          window.open("/statistic/" + user.ID, "_blank");
        }}
      >
        <label className="col-8">{user.ho.concat(" ", user.ten)}</label>
        <label className="col">{"ID: " + user.ID}</label>
      </li>
    );
  }
  return (
    <>
      <div className="p-1">Kết quả tìm kiếm</div>
      <ul className="p-0">{info}</ul>
    </>
  );
};

const NavItem = (props) => {
  return (
    <li
      className="nav-item d-flex justify-content-end"
      data-bs-toggle="tooltip"
      data-bs-placement="bottom"
      title={props.children}
    >
      <Link
        to={props.to}
        className="pb-1 py-lg-2 text-dark text-decoration-none"
      >
        <span className="gi d-lg-none lh-base fw-light ps-3">
          {props.children}
        </span>
        <i className={props.className + " px-3 fs-5"}></i>
      </Link>
    </li>
  );
};

const Download = (props) => {
  return (
    <li
      className="nav-item d-flex justify-content-end"
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
      className="nav-item d-flex justify-content-end"
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
