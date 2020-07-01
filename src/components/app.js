import React, { Fragment, } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import Home from "./home";
import Login from "./login";
import { useSelector } from "react-redux";


function App() {
  const user = useSelector((state) => state.user);
  const PrivateRoute = ({ component: Component, ...props }) => {
    let location = useLocation();
    return (
      <Route
        {...props}
        render={innerProps =>
          user ?
            <Component {...innerProps} />
            :
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location.state || { from: { pathname: "/" } } }
              }}
            />
        }
      />
    );
  };
  
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route path="/login" exact={true} component={Login} />
          <PrivateRoute path="/" exact={true} component={Home} />
          {/* <Redirect from="*" to="/login" /> */}
          <Route path="*" exact={true} component={Login} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
