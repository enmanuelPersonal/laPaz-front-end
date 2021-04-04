import {
  DasboardIcon,
  ReporteIcon,
  InventarioIcon,
  VentasIcon,
  AssessmentIcon,
  ClienteIcon,
  TimelineIcon,
  UserIcon,
  LogOutIcon,
} from '../components/Icons.js';

const routes = [
  {
    children: false,
    Component: DasboardIcon,
    label: 'Dashboard',
    path: '/admin/dashboar',
  },
  {
    children: true,
    Component: ReporteIcon,
    label: 'Reportes',
    path: '',
  },
  {
    children: true,
    Component: InventarioIcon,
    label: 'Inventario',
    path: '',
  },
  {
    children: false,
    Component: VentasIcon,
    label: 'Ventas',
    path: '/admin/ventas',
  },
  {
    children: true,
    Component: ClienteIcon,
    label: 'Suscripciones',
    path: '',
  },
  {
    children: false,
    Component: AssessmentIcon,
    label: 'Planes fúnebres',
    path: '/admin/planes',
  },
  {
    children: false,
    Component: ClienteIcon,
    label: 'Empleados',
    path: '/admin/empleado',
  },
  {
    children: false,
    Component: TimelineIcon,
    label: 'Suplidores',
    path: '/admin/suplidores',
  },
  {
    children: false,
    Component: UserIcon,
    label: 'Usuarios',
    path: '/admin/usuarios',
  },
  {
    children: false,
    Component: LogOutIcon,
    label: 'LogOut',
    path: '/login',
  },
];

const routesChilds = {
  reportes: [
    { label: 'Clientes', Icon: ClienteIcon, path: '/admin/reportClientes' },
    {
      label: 'Difuntos',
      Icon: ClienteIcon,
      path: '/admin/reportDifunto',
    },
  ],
  inventario: [
    { label: 'Inventario', Icon: ClienteIcon, path: '/admin/inventario' },
    {
      label: 'Productos',
      Icon: ClienteIcon,
      path: '/admin/productos',
    },
    {
      label: 'Compras',
      Icon: ClienteIcon,
      path: '/admin/compras',
    },
  ],
  suscripciones: [
    {
      Icon: ClienteIcon,
      label: 'Suscripciones',
      path: '/admin/suscripciones',
    },
    {
      Icon: ClienteIcon,
      label: 'Clientes',
      path: '/admin/clientes',
    },
    {
      Icon: ClienteIcon,
      label: 'Parientes',
      path: '/admin/parientes',
    },
    {
      Icon: ClienteIcon,
      label: 'Mensualidad',
      path: '/admin/mensualidad',
    },
  ],
};

export { routes, routesChilds };
