import React from "react";
import handleInputChange from "../logic/handler";

export default function LoginForm(props) {
  return (
    <form
      action={props.action}
      method={props.method}
      className={props.className + " shadow bg-light p-3 rounded"}
      id={props.id}
    >
      <h1 className="mb-4">Đăng nhập</h1>
      <InputGroup
        type="text"
        name="username"
        id="username"
        label="Tài khoản"
        placeholder="Nhập tài khoản"
      ></InputGroup>
      <InputGroup
        type="password"
        name="password"
        id="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
      ></InputGroup>

      <button
        id="login-btn"
        disabled
        className="btn shadow rounded w-100 fs-4 py-3"
      >
        Đăng nhập
      </button>
    </form>
  );
}

class InputGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    handleInputChange();
  }

  render() {
    return (
      <div className="mb-4">
        <label htmlFor={this.props.name} className="form-label fs-4">
          {this.props.label}
        </label>
        <input
          className="form-control fs-5 p-3"
          type={this.props.type}
          name={this.props.name}
          id={this.props.id}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
