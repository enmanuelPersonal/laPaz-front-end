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
import Inventario from '../pages/admin/inventario';
import Suplidor from '../pages/admin/suplidor';
import Compra from '../pages/admin/compras';
import Venta from '../pages/admin/ventas';
import Plan from '../pages/admin/planes';
import Difunto from '../pages/admin/difuntos';

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
          <Route exact path="/admin/suplidores" component={Suplidor} />
          <Route exact path="/admin/parientes" component={Pariente} />
          <Route exact path="/admin/mensualidad" component={Mensualidad} />
          <Route exact path="/admin/productos" component={Producto} />
          <Route exact path="/admin/inventario" component={Inventario} />
          <Route exact path="/admin/compras" component={Compra} />
          <Route exact path="/admin/ventas" component={Venta} />
          <Route exact path="/admin/planes" component={Plan} />
          <Route exact path="/admin/difuntos" component={Difunto} />
          <Redirect to="/admin/dashboar" />
        </Switch>
      </div>
    </>
  );
};
