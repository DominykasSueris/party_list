import React, { Component } from "react";
import { Redirect } from "react-router";
import Input from "./input";
import { login } from "../services/authService";

class Login extends Component {
  state = {
    account: { username: "", password: "" },
    isSignedUp: false
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { account } = this.state;
    await login(account.username, account.password)
      .then(res => {
        if (res.status === 200) {
          this.setState({ isSignedUp: true });
        }
      })
      .catch(error => alert("wrong password"));
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account, isSignedUp } = this.state;

    if (isSignedUp) {
      return (
        <Redirect
          to={{
            pathname: "/home",
            state: { username: account.username, password: account.password }
          }}
        />
      );
    } else {
      return (
        <div>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="username"
              label="username"
              value={account.username}
              onChange={this.handleChange}
              type="text"
            />
            <Input
              name="password"
              label="password"
              value={account.password}
              onChange={this.handleChange}
              type="password"
            />
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      );
    }
  }
}

export default Login;
