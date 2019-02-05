import React, { Component } from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";
import store from "../../store/index";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../setAuthToken";
import { setCurrentUser, logoutUser } from "../../store/actions/authentication";

import Navbar from "../Navbar";
import Register from "../Register";
import Login from "../Login";
import Home from "../Home";
import { UserPage, NotFound } from "../Pages";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register/" component={Register} />
            <Route exact path="/login/" component={Login} />
            <Route exact path="/:userId/" component={UserPage} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
