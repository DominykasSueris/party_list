import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import { login } from "../../services/authService";
import { UserContext } from "../../App";
import Input from "./input";
import Error from "../error/error";

const Login = () => {
  const userContext = useContext(UserContext);

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    await login(userName, userPassword)
      .then(res => {
        if (res.status === 200) {
          userContext.setUserName(userName);
          userContext.setSignedUp(true);
          userContext.setUserPassword(userPassword);
        }
      })
      .catch(error => {
        setError(true);
      });
  };

  if (userContext.isSignedUp) {
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
