import React, { useState } from "react";
import { checkInputs, toggleBtn } from "./handler";

const InputGroup = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onChange
      ? props.onChange()
      : toggleBtn(props.formtype, checkInputs());
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={props.name}
        className={"form-label " + (props.size === "big" ? "fs-4" : "fs-5")}
      >
        {props.label}
      </label>
      <input
        className={
          "form-control" + (props.size === "big" ? " p-3 fs-5" : " px-3 py-2")
        }
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        value={value}
        onChange={handleChange}
        onBlur={props.onBlur}
        autoComplete="off"
      />
    </div>
  );
};

export default InputGroup;
