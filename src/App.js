import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewTenant from "./tenant/pages/NewTenant";
import UpdateTenant from "./tenant/pages/UpdateTenant";
import UserTenant from "./tenant/pages/UserTenants";
import Auth from "./user/pages/Auth";
import Users from "./user/pages/Users";
import { AuthContext } from "./shared/context/auth-context";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/:userId/places" exact>
          <UserTenant />
        </Route>
        <Route path="/tenant/new" exact>
          <NewTenant />
        </Route>
        <Route path="/tenant/:tenantId">
          <UpdateTenant />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserTenant />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

/*
            <Route path="/" exact>
              <Users />
            </Route>
            <Route path="/:userId/places" exact>
              <UserTenant />
            </Route>
            <Route path="/tenant/new" exact>
              <NewTenant />
            </Route>
            <Route path="/tenant/:tenantId">
              <UpdateTenant />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
            <Redirect to="/" />
            */
