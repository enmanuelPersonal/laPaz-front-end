import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ClientHome } from '../pages/ClientHome';

export const ClientRoutes = () => {
  return (
    <>
      <div>
        <Switch>
          <Route exact path="/client/home" component={ClientHome} />
        </Switch>
      </div>
    </>
  );
};
