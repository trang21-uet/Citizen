import React from "react";
import Modal from "../shared/Modal";
import AccountForm from "./AccountForm";
import PersonForm from "./PersonForm";

const SignupForm = (props) => {
  return (
    <>
      <ul className="nav nav-pills mb-3" id="form-tab" role="tablist">
        <TabLabel form="account">Cấp tài khoản mới</TabLabel>
        <TabLabel form="person">Nhập thông tin người dân</TabLabel>
      </ul>
      <div className="tab-content d-lg-flex justify-content-center">
        <TabPane form="account">
          <AccountForm
            child={props.child}
            id={props.id}
            className={props.className}
          />
        </TabPane>
        <TabPane form="person">
          <PersonForm
            method="POST"
            child={props.child}
            id={props.id}
            className={props.className}
          />
        </TabPane>
      </div>
      <Modal
        label="Cấp tài khoản thành công!"
        type="redirect"
        to="/manage"
        id="account-alert"
      >
        Bạn muốn tiếp tục hay chuyển đến trang quản lý tài khoản?
      </Modal>
      <Modal
        label="Nhập thông tin thành công!"
        type="redirect"
        to="/statistic"
        id="person-alert"
      >
        Bạn muốn tiếp tục hay chuyển đển trang thông tin dân số
      </Modal>
    </>
  );
};

const TabLabel = ({ form, children }) => {
  return (
    <li className="nav-item" role="presentation">
      <button
        disabled
        className="nav-link text-dark m-1 active"
        id={form + "-tab"}
        data-bs-toggle="pill"
        data-bs-target={"#" + form}
        type="button"
        role="tab"
        aria-controls={form}
        aria-selected={true}
      >
        {children}
      </button>
    </li>
  );
};

const TabPane = ({ children, form }) => {
  return (
    <div
      className="tab-pane fade active show"
      id={form}
      role="tabpanel"
      aria-labelledby={form + "-tab"}
    >
      {children}
    </div>
  );
};

export default SignupForm;
