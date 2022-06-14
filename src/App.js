import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./navbar/navBar";
import Login from "./login/login";
import Home from "./components/home";
import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default App;
