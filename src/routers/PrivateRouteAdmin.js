import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';

export const PrivateRouteAdmin = ({
  isUserLoggedIn,
  userType,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isUserLoggedIn && userType === 'administrador' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

PrivateRouteAdmin.prototype = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  userType: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};
