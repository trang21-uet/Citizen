import React, { useState } from "react";
import { handleInputChange } from "../logic/handler";

const InputGroup = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    handleInputChange(props.formtype);
  };

  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="form-label fs-4">
        {props.label}
      </label>
      <input
        className="form-control fs-5 p-3"
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputGroup;
