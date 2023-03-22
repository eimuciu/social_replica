import React from "react";
//React router
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({
  component: Component,
  authenticated,
  passProps = {},
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} {...passProps} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
