import React, { useEffect, useState } from "react";
import { checkInputs, toggleBtn } from "./handler";

const InputGroup = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onChange
      ? props.onChange()
      : toggleBtn(props.form + "-btn", checkInputs(props.form + "-form"));
  };

  return (
    <div className={props.className + " mb-4"}>
      <label
        htmlFor={props.name}
        className={"form-label " + (props.size === "big" ? "fs-4" : "fs-5")}
      >
        {props.label}
      </label>
      <input
        className={
          " form-control" + (props.size === "big" ? " p-3 fs-5" : " px-3 py-2")
        }
        type={props.type ? props.type : "text"}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
  );
};

const RadioGroup = ({ id, name, value, checked, label, onChange }) => {
  useEffect(() => {
    checked && document.getElementById(id).setAttribute("checked", "");
  });
  return (
    <div className="form-check form-check-inline pt-2">
      <input
        className="form-check-input"
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange ? onChange : () => {}}
      />
      <label htmlFor={id} className="form-check-label">
        {label}
      </label>
    </div>
  );
};

export default InputGroup;
export { RadioGroup };
