import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Sidebar from '../pages/admin/sidebar/Sidebar';

import { AdminHome } from '../pages/admin/AdminHome';
import Dashboard from '../pages/admin/Dashboard';

export const AdminRoutes = () => {
  return (
    <>
      <Sidebar />
      <div>
        <Switch>
          <Route exact path="/admin/home" component={AdminHome} />
          <Route exact path="/admin/dashboar" component={Dashboard} />
          <Redirect to="/admin/dashboar"/>
        </Switch>
      </div>
    </>
  );
};
