import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { toast } from "react-toastify";

const NavBar = () => {
  const { isSignedUp, setSignedUp, userName, setUserName, setUserPassword } =
    useContext(UserContext);

  const logout = () => {
    setSignedUp(false);
    setUserName("");
    setUserPassword("");
    sessionStorage.removeItem("isSignedUp");
    sessionStorage.removeItem("userPassword");
    sessionStorage.removeItem("userName");
    toast.success("Logged Out", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true
    });
  };

  if (isSignedUp) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-end">
        <div>{userName}</div>
        <div>
          <Link
            onClick={() => logout()}
            className="nav-link active"
            aria-current="page"
            to="/login"
          >
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
