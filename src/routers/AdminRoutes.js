import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Sidebar from '../pages/admin/sidebar/Sidebar';

import Dashboard from '../pages/admin/Dashboard';
import Employe from '../pages/admin/employe';
import Suscripcion from '../pages/admin/suscripcion';
import Cliente from '../pages/admin/clientes';
import Mensualidad from '../pages/admin/mensualidad';
import Pariente from '../pages/admin/parientes';

export const AdminRoutes = () => {
  return (
    <>
      <Sidebar />
      <div>
        <Switch>
          <Route exact path="/admin/dashboar" component={Dashboard} />
          <Route exact path="/admin/empleado" component={Employe} />
          <Route exact path="/admin/suscripciones" component={Suscripcion} />
          <Route exact path="/admin/clientes" component={Cliente} />
          <Route exact path="/admin/parientes" component={Pariente} />
          <Route exact path="/admin/mensualidad" component={Mensualidad} />
          <Redirect to="/admin/dashboar" />
        </Switch>
      </div>
    </>
  );
};
