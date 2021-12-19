import React, { useState } from "react";
import AccountForm from "./AccountForm";
import PersonForm from "./PersonForm";

const SignupForm = (props) => {
  return (
    <>
      <ul className="nav nav-pills mb-3" id="form-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="account-tab"
            data-bs-toggle="pill"
            data-bs-target="#account"
            type="button"
            role="tab"
            aria-controls="account"
            aria-selected="true"
          >
            Create
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="person-tab"
            data-bs-toggle="pill"
            data-bs-target="#person"
            type="button"
            role="tab"
            aria-controls="person"
            aria-selected="false"
          >
            Register
          </button>
        </li>
      </ul>

      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="account"
          role="tabpanel"
          aria-labelledby="account-tab"
        >
          <AccountForm
            child={props.child}
            id={props.id}
            className={props.className}
          />
        </div>
        <div
          className="tab-pane fade"
          id="person"
          role="tabpanel"
          aria-labelledby="person-tab"
        >
          <PersonForm
            child={props.child}
            id={props.id}
            className={props.className}
          />
        </div>
      </div>
    </>
  );
};

export default SignupForm;
