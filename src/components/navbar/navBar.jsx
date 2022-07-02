import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const NavBar = () => {
  const { isSignedUp, setSignedUp, userName } = useContext(UserContext);

  const logout = () => {
    setSignedUp(!isSignedUp);
    console.log("clicked");
    console.log(isSignedUp);
  };

  if (isSignedUp) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-end">
        <div>{userName}</div>
        <div>
          <Link onClick={logout} className="nav-link active" aria-current="page" to="/home">
            Logout
          </Link>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-nav">
          <Link className="nav-link active" aria-current="page" to="/register">
            Register
          </Link>
          <Link className="nav-link active" aria-current="page" to="/login">
            Login
          </Link>
        </div>
      </nav>
    );
  }
};

export default NavBar;
