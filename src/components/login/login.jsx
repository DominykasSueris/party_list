import { Redirect } from "react-router";
import Input from "./input";
import { login } from "../../services/authService";
import Error from "../error/error";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isSignedUp, setSignedUp] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {}, [isSignedUp, error, userName, userPassword]);

  const handleSubmit = async e => {
    e.preventDefault();
    await login(userName, userPassword)
      .then(res => {
        if (res.status === 200) {
          setSignedUp(true);
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {error === true ? <Error /> : null}
          <Input
            name="username"
            label="username"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            type="text"
          />
          <Input
            name="password"
            label="password"
            value={userPassword}
            onChange={e => setUserPassword(e.target.value)}
            type="password"
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
};

export default Login;
