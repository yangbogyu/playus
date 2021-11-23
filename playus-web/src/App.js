import React from "react";
import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import User from "./screens/User";
import List from "./screens/List";
import Register from "./screens/Register";
import Comunication from "./screens/Comunication";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <HelmetProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path={routes.home} exact>
              {isLoggedIn ? <Home /> : <Login />}
            </Route>
            {!isLoggedIn ? (
              <Route path={routes.signUp}>
                <SignUp />
              </Route>
            ) : null}
            <Route path={routes.list}>
              {isLoggedIn ? <List /> : <Login />}
            </Route>
            <Route path={routes.user}>
              {isLoggedIn ? <User /> : <Login />}
            </Route>
            <Route path={routes.register}>
              {isLoggedIn ? <Register /> : <Login />}
            </Route>
            {isLoggedIn ? (
              // <Route path={`${routes.room}/:no`} component={Comunication} />
              <Route
                path={`${routes.room}`}
                render={(props) => <Comunication {...props} />}
              />
            ) : (
              <Login />
            )}

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
export default App;
