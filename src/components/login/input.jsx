import React from "react";

const Input = ({ name, value, onChange, label, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        className="form-control"
      ></input>
    </div>
  );
};

export default Input;
