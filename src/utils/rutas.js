import {
  DasboardIcon,
  ReporteIcon,
  InventarioIcon,
  VentasIcon,
  AssessmentIcon,
  ClienteIcon,
  UserIcon,
  LogOutIcon,
  EmpleadoIcon,
  ProductoIcon,
  ComprasIcon,
  DifuntoIcon,
  SuscripcionIcon,
  MensualidadIcon,
  ParienteIcon,
  ArregloIcon
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
    Component: ComprasIcon,
    label: 'Compras',
    path: '',
  },
  {
    children: true,
    Component: SuscripcionIcon,
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
    Component: ArregloIcon,
    label: 'Armar Arreglos',
    path: '/admin/arreglos',
  },
  {
    children: false,
    Component: DifuntoIcon,
    label: 'Difuntos',
    path: '/admin/difuntos',
  },
  {
    children: false,
    Component: EmpleadoIcon,
    label: 'Empleados',
    path: '/admin/empleado',
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
    {
      label: 'Ventas',
      Icon: VentasIcon,
      path: '/admin/reportes/reportVenta',
    },
    {
      label: 'Compras',
      Icon: ComprasIcon,
      path: '/admin/reportes/reportCompra',
    },
    // { label: 'Clientes', Icon: ClienteIcon, path: '/admin/reportClientes' },
    // {
    //   label: 'Difuntos',
    //   Icon: DifuntoIcon,
    //   path: '/admin/reportDifunto',
    // },
  ],
  inventario: [
    { label: 'Inventario', Icon: InventarioIcon, path: '/admin/inventario' },
    {
      label: 'Productos',
      Icon: ProductoIcon,
      path: '/admin/productos',
    },
  ],
  suscripciones: [
    {
      Icon: SuscripcionIcon,
      label: 'Suscripciones',
      path: '/admin/suscripciones',
    },
    {
      Icon: ClienteIcon,
      label: 'Clientes',
      path: '/admin/clientes',
    },
    {
      Icon: ParienteIcon,
      label: 'Parientes',
      path: '/admin/parientes',
    },
    {
      Icon: MensualidadIcon,
      label: 'Mensualidad',
      path: '/admin/mensualidad',
    },
  ],
  compras: [
    { label: 'Compras', Icon: ComprasIcon, path: '/admin/compras' },
    {
      label: 'Suplidores',
      Icon: ParienteIcon,
      path: '/admin/suplidores',
    },
  ],
};

export { routes, routesChilds };
