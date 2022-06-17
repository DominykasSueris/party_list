import React from "react";
import "./spinner.css";

const Spiner = () => {
  return (
    <div>
      <div className="spinner-border text-dark" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Spiner;
