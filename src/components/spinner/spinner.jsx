import React from "react";
import "./spinner.css";

const Spinner = ({ className }) => {
  return (
    <div>
      <div className={`spinner-border text-dark ${className}`} role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Spinner;
