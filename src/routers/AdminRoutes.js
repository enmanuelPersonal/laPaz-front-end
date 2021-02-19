import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AdminHome } from '../pages/AdminHome';

export const AdminRoutes = () => {
  return (
    <>
      <div>
        <Switch>
          <Route exact path="/admin/home" component={AdminHome} />
        </Switch>
      </div>
    </>
  );
};
