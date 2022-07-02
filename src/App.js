import React, { useState, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar/navBar";
import Login from "./components/login/login";
import Home from "./components/home/home";
import "./App.css";

export const UserContext = createContext();

const App = () => {
  const [isSignedUp, setSignedUp] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <React.Fragment>
      <UserContext.Provider
        value={{ isSignedUp, setSignedUp, userName, setUserName, userPassword, setUserPassword }}
      >
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/home" component={Home}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </main>
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default App;
