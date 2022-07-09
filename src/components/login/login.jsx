import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import { login } from "../../services/authService";
import { UserContext } from "../../App";
import { toast } from "react-toastify";
import Input from "./input";
import Error from "../error/error";
import "../login/login.css";

const Login = () => {
  const { setUserName, setSignedUp, setUserPassword, isSignedUp } = useContext(UserContext);
  const notify = () =>
    toast.success("Logged in successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true
    });

  const [userName, setUserFormName] = useState("");
  const [userPassword, setUserFormPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    await login(userName, userPassword)
      .then(res => {
        if (res.status === 200) {
          setUserName(userName);
          setSignedUp(true);
          setUserPassword(userPassword);
          notify();
        }
      })
      .catch(error => {
        setError(true);
      });
  };

  if (isSignedUp) {
    return (
      <React.Fragment>
        <Redirect
          to={{
            pathname: "/home"
          }}
        />
      </React.Fragment>
    );
  } else {
    return (
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          {error === true ? <Error /> : null}
          <Input
            name="username"
            label="Username"
            value={userName}
            onChange={e => setUserFormName(e.target.value)}
            type="text"
          />
          <Input
            name="password"
            label="Password"
            value={userPassword}
            onChange={e => setUserFormPassword(e.target.value)}
            type="password"
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
};

export default Login;
