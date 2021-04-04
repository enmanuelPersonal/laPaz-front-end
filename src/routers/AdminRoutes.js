import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Sidebar from '../pages/admin/sidebar/Sidebar';

import Dashboard from '../pages/admin/Dashboard';
import Employe from '../pages/admin/employe';
import Suscripcion from '../pages/admin/suscripcion';
import Cliente from '../pages/admin/clientes';
import Mensualidad from '../pages/admin/mensualidad';
import Pariente from '../pages/admin/parientes';
import Usuario from '../pages/admin/usuarios';
import Producto from '../pages/admin/productos';

export const AdminRoutes = () => {
  return (
    <>
      <Sidebar />
      <div>
        <Switch>
          <Route exact path="/admin/dashboar" component={Dashboard} />
          <Route exact path="/admin/usuarios" component={Usuario} />
          <Route exact path="/admin/empleado" component={Employe} />
          <Route exact path="/admin/suscripciones" component={Suscripcion} />
          <Route exact path="/admin/clientes" component={Cliente} />
          <Route exact path="/admin/parientes" component={Pariente} />
          <Route exact path="/admin/mensualidad" component={Mensualidad} />
          <Route exact path="/admin/productos" component={Producto} />
          <Redirect to="/admin/dashboar" />
        </Switch>
      </div>
    </>
  );
};
