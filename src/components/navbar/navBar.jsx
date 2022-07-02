import React, { useContext } from "react";
import { UserContext } from "../../App";

const NavBar = () => {
  const { isSignedUp, userName } = useContext(UserContext);
  if (isSignedUp) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div>{userName}</div>
        <div>
          <a className="nav-link active" aria-current="page" href="/">
            Logout
          </a>
        </div>
      </nav>
    );
  } else {
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
  }
};

export default NavBar;
