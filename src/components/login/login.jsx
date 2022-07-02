import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import { login } from "../../services/authService";
import { UserContext } from "../../App";
import Input from "./input";
import Error from "../error/error";

const Login = () => {
  const { setUserName, setSignedUp, setUserPassword, isSignedUp } = useContext(UserContext);

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
            onChange={e => setUserFormName(e.target.value)}
            type="text"
          />
          <Input
            name="password"
            label="password"
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
