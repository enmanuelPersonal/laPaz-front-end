import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

import { ClientProfile } from '../pages/client/Profile/ClientProfile';
import HomePage from '../pages/HomePage';

export const ClientRoutes = ({ isUserLoggedIn, userType }) => {
  return (
    <>
      <div>
        <Switch>
          <PrivateRoute
            path="/profile"
            component={ClientProfile}
            isUserLoggedIn={isUserLoggedIn}
            userType={userType}
          />
          <Route exact path="/home" component={HomePage} />
          <Redirect to="/home" />
        </Switch>
      </div>
    </>
  );
};
