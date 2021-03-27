import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Sidebar from '../pages/admin/sidebar/Sidebar';

import Dashboard from '../pages/admin/Dashboard';
import Employe from '../pages/admin/employe';

export const AdminRoutes = () => {
  return (
    <>
      <Sidebar />
      <div>
        <Switch>
          <Route exact path="/admin/dashboar" component={Dashboard} />
          <Route exact path="/admin/empleado" component={Employe} />
          <Redirect to="/admin/dashboar" />
        </Switch>
      </div>
    </>
  );
};
