import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({
  isUserLoggedIn,
  userType,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        // isUserLoggedIn && userType === 'cliente corriente' ? (
          <Component {...props} />
        // ) : (
          // <Redirect to="/" />
        // )
      }
    />
  );
};

PrivateRoute.prototype = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};
