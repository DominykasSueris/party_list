import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-nav">
        <a className="nav-link active" aria-current="page" href="/register">
          Register
        </a>
        <a className="nav-link active" aria-current="page" href="/login">
          Login
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
