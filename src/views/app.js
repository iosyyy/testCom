import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import cookie from "react-cookies";
import axios from "axios";

const requestAuthorization = (request) => {
  // console.log("axios request拦截器");
  const user = cookie.load("user");
  if (user) {
    // console.log("加响应头");
    request.headers.Authorization = user.token;
    return request;
  } else {
    return request;
  }
};
// request拦截器
axios.interceptors.request.use(
  (config) => {
    requestAuthorization(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
const hist = createBrowserHistory();
export default function App() {
  useEffect(() => {
    const user = cookie.load("user");
    if (!user) {
      hist.push("/login-page");
    } else {
      hist.push("/profile-page");
    }
  }, []);

  return (
    <Router history={hist}>
      <Switch>
        <Route path="/landing-page" component={LandingPage} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/login-page" component={LoginPage} />
        <Redirect to="/login-page" />
      </Switch>
    </Router>
  );
}
