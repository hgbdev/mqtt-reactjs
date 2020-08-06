import React, { useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.jsx";
import Login from "views/Login.jsx";
import Register from "views/Register.jsx";
import { createBrowserHistory } from "history";
import jwt from "jwt-decode";
const hist = createBrowserHistory();

const App = (props) => {
  const token = localStorage.getItem("access_token") || null;
  const decodeToken = token ? jwt(token) : {};
  const [data, setData] = useState({
    checkToken: false,
    isToken: false,
  });
  useEffect(() => {
      console.log(window.location.href);
    if (decodeToken.exp && decodeToken.exp > Date.now() / 1000) {
      setData({ ...data, checkToken: true, isToken: true });
    } else {
      setData({ ...data, checkToken: true, isToken: false });
      hist.push("/login");
    }
  }, []);

  if (data.checkToken) {
    if (data.isToken === false) {
      return (
        <Router history={hist}>
          <Switch>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Route path="/login" render={(props) => <Login {...props} />} />
            <Route
              path="/register"
              render={(props) => <Register {...props} />}
            />
            <Redirect to="/login" />
          </Switch>
        </Router>
      );
    } else {
      return (
        <Router history={hist}>
          <Switch>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Redirect to="/admin/console" />
          </Switch>
        </Router>
      );
    }
  }
  return null;
};

export default App;
