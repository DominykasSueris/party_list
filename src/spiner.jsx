import React from "react";

const Spiner = () => {
  return (
    <div>
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only"></span>
      </div>
      <div>
        <h1>Loading</h1>
      </div>
    </div>
  );
};

export default Spiner;
