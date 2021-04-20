import React, { useState, useEffect, useContext, forwardRef } from 'react';
import {
  PeopleOutlineTwoTone,
  Cancel,
  ExitToApp,
  Search,
  Add,
  ViewList,
  Print,
  MonetizationOn,
} from '@material-ui/icons';
import {
  Tooltip,
  makeStyles,
  Box,
  Grid,
  Button,
  TextField,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { drawerWidth } from '../../../utils/consts.js';

import TableVenta from './TableVenta';
import PageHeader from '../../../components/PageHeader';
import Popup from '../../../components/Popup.js';
import TableSelectCliente from '../clientes/TableSelectClient.js';
import FormCliente from '../clientes/Form.js';
import AppContext from '../../../auth/AuthContext.js';
import { get, post } from '../../../helpers/fetch.js';
import TableSelectProuct from '../productos/TableSelectProduct.js';
import ProductForm from '../productos/Form.js';
import { DialogSlide } from '../../../components/alert/DialogSlide.js';
import { Transporte } from '../../../components/FinalizarVenta.js';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
  newButton: {
    textTransform: 'none',
  },
  input: {
    flex: 1,
  },
  rootSearch: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    marginLeft: drawerWidth,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#ffff',
  },
  containerTable: {
    marginLeft: drawerWidth + 15,
    backgroundColor: '#fff',
    marginRight: 15,
    borderRadius: 10,
    padding: '1rem',
  },
  btn: {
    marginRight: theme.spacing(1),
  },
  divider: {
    marginTop: 25,
    marginBottom: 25,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialCliente = {
  nombre: '',
  apellido: '',
};

const initialBodyProduct = {
  nombre: '',
  log: {
    precio: 0,
  },
};

const initialState = {
  cantidad: 1,
  precio: 0,
};

const Venta = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    state: {
      userData: { nombre: nameUser },
    },
  } = useContext(AppContext);
  const [openPopupSelecctProducto, setOpenPopupSelecctProducto] = useState(
    false
  );
  const [errorServer, setErrorServer] = useState(false);
  const [isVentaSuccess, setIsVentaSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogTransporte, setOpenDialogTransporte] = useState(false);
  const [openPopupCliente, setOpenPopupCliente] = useState(false);
  const [openPopupSelecctCliente, setOpenPopupSelecctCliente] = useState(false);
  const [openPopupProducto, setOpenPopupProducto] = useState(false);
  const [openDialogIsTransporte, setOpenDialogIsTransporte] = useState(false);

  const [getTypePlan, setGetTypePlan] = useState([]);
  const [typePago, setTypePago] = useState([]);
  const [getItebis, setGetItebis] = useState([]);
  const [productBodySelect, setProductBodySelect] = useState([]);
  const [productAdd, setProductAdd] = useState(initialState);

  const [clienteId, setClienteId] = useState('');
  const [getTypePagoId, setGetTypePagoId] = useState('');
  const [getTypePlanId, setGetTypePlanId] = useState('');
  const [getItebisId, setGetItebisId] = useState('');
  const [clienteName, setClienteName] = useState(initialCliente);
  const [getTotal, setGetTotal] = useState(0.0);
  const [getSubTotal, setGetSubTotal] = useState(0.0);
  const [productoId, setProductoId] = useState('');
  const [productBody, setProductBody] = useState(initialBodyProduct);

  // TRANSPORTE
  const [employeId, setEmployeId] = useState('');
  const [vehiculoId, setVehiculoId] = useState('');
  const [getDireccion, setGetDireccion] = useState([]);

  const { nombre, apellido } = clienteName;
  const {
    nombre: descripcion,
    log: { precio },
  } = productBody;
  const { cantidad } = productAdd;

  const setAttributes = ({ openDialog = true, error = false }) => {
    setErrorServer(error);
    setOpenDialog(openDialog);
  };

  useEffect(() => {
    const fetchGetTypePlan = async () => {
      await get('typePlan')
        .then((res) => res.json())
        .then(({ data }) => setGetTypePlan(data))
        .catch(() => {});
    };

    const fetchGetTypePago = async () => {
      await get('typePago')
        .then((res) => res.json())
        .then(({ data }) => setTypePago(data))
        .catch(() => {});
    };

    const fetchGetItebis = async () => {
      await get('itebis')
        .then((res) => res.json())
        .then(({ data }) => setGetItebis(data || []))
        .catch(() => {});
    };

    fetchGetTypePlan();
    fetchGetTypePago();
    fetchGetItebis();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchGetProductPlan = async () => {
      await get(`plan/${getTypePlanId}`)
        .then((res) => res.json())
        .then(({ data }) => {
          setProductBodySelect([...data]);
        })
        .catch(() => {});
    };

    if (getTypePlanId) {
      fetchGetProductPlan();
    }

    // eslint-disable-next-line
  }, [getTypePlanId]);

  const handleChange = ({ value, name }) => {
    setProductAdd({ ...productAdd, [name]: value });
  };

  const handleAddProduct = () => {
    Object.assign(productBody, { cantidad });
    setProductBodySelect([...productBodySelect, productBody]);
    setProductAdd(initialState);
    setProductBody(initialBodyProduct);
    setProductoId('');
  };

  const handleClose = () => {
    setOpenDialog(false);
    setErrorServer(false);
    if (isVentaSuccess) {
      setIsVentaSuccess(false);
    }
  };

  const handleSave = async (isEnvio = true) => {
    const userData = {};
    let getItebisIdRes = '';

    const detalle = productBodySelect.map(
      ({ idProducto, cantidad, log: { precio } }) => ({
        idProducto,
        cantidad,
        precio,
      })
    );

    const { data: dataItebis } = await get('itebis').then((res) => res.json());

    dataItebis.forEach(({ idItebis, porcentaje }) => {
      if (porcentaje === getItebisId) {
        getItebisIdRes = idItebis;
        return;
      }
    });

    Object.assign(
      userData,
      { detalle },
      { total: parseFloat(getTotal) },
      { idCliente: clienteId },
      { NFC: 'werfgwer' },
      { idItebis: getItebisIdRes },
      { idEmpleado: employeId },
      { idVehiculo: vehiculoId },
      { direcciones: getDireccion },
      { tipoPagos: [getTypePagoId] },
      { isEnvio }
    );

    if (!detalle.length) {
      return setAttributes({
        openDialog: true,
        error: 'Por favor tener productos o servicios seleccionados',
      });
    }

    if (!clienteId) {
      return setAttributes({
        openDialog: true,
        error:
          'Por favor verifique que el cliente este correctamente seleccionado',
      });
    }

    if (!getTypePagoId) {
      return setAttributes({
        openDialog: true,
        error:
          'Por favor verifique que el tipo de pago este correctamente seleccionado',
      });
    }

    if (!getItebisId) {
      return setAttributes({
        openDialog: true,
        error:
          'Por favor verifique que el itebis este correctamente seleccionado',
      });
    }

    return post('venta/add', userData)
      .then(async (response) => {
        if (response.status === 201) {
          setErrorServer(false);
          setIsVentaSuccess(true);
          cleanForm();
        } else {
          const res = await response.json();
          setErrorServer(res.message);
        }
      })
      .catch((err) =>
        setErrorServer('Verifique que todos los campos esten correctos')
      )
      .finally(() => setOpenDialog(true));
  };

  const cleanForm = () => {
    setProductBodySelect([]);
    setProductAdd(initialState);
    setProductBody(initialBodyProduct);
    setProductoId('');
    setGetSubTotal(0.0);
    setGetTotal(0.0);
    setClienteId('');
    setClienteName('');
    setGetItebisId('');
    setEmployeId('');
    setVehiculoId('');
    setGetDireccion([]);
    setGetTypePagoId('');
    setGetTypePlanId('');
  };

  return (
    <div>
      <PageHeader
        className={classes.root}
        title="Ventas"
        subTitle="Registrar, consultar y actualizar"
        icon={<MonetizationOn fontSize="large" />}
      />
      <Box
        justifyContent="center"
        display="flex"
        className={classes.containerTable}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex">
              <Box flexGrow={1}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Cancel />}
                >
                  Cancelar Factura
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#630F5C',
                    color: '#fff',
                  }}
                  className={classes.btn}
                  startIcon={<ViewList />}
                  onClick={() => history.push('/admin/inventario')}
                >
                  Inventario
                </Button>
              </Box>

              {/*     <Box>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#630F5C',
                    color: '#fff',
                  }}
                  className={classes.btn}
                  startIcon={<Print />}
                >
                  Imprimir
                </Button>
              </Box> */}
              <Box>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#336D12',
                    color: '#fff',
                  }}
                  className={classes.button}
                  startIcon={<ExitToApp />}
                  onClick={() => setOpenDialogIsTransporte(true)}
                >
                  Finalizar
                </Button>
              </Box>
            </Box>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  name="cliente"
                  type="text"
                  fullWidth
                  label={'Cliente'}
                  value={`${nombre || ''} ${apellido || ''}`}
                  disabled={true}
                />
              </Grid>

              <Grid item xs={3}>
                <Tooltip title="Buscar Cliente" placement="top">
                  <Button
                    variant="contained"
                    className={classes.btn}
                    style={{ backgroundColor: '#939393', color: '#fff' }}
                    aria-label="add"
                    component="span"
                    onClick={() => setOpenPopupSelecctCliente(true)}
                  >
                    <Search />
                  </Button>
                </Tooltip>
                <Tooltip title="Registrar Cliente" placement="top">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#630F5C', color: '#fff' }}
                    aria-label="add"
                    component="span"
                    onClick={() => {
                      setOpenPopupCliente(true);
                    }}
                  >
                    <Add />
                  </Button>
                </Tooltip>
              </Grid>

              <Grid item xs={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Método de Pago</InputLabel>
                  <Select
                    label="Tipo"
                    name="idTipoProducto"
                    value={getTypePagoId}
                    onChange={({ target: { value } }) =>
                      setGetTypePagoId(value)
                    }
                  >
                    <MenuItem disabled value="">
                      Seleccione Método de Pago
                    </MenuItem>
                    {typePago.map(({ idTipoPago, tipo }) => (
                      <MenuItem key={idTipoPago} value={idTipoPago}>
                        {tipo}
                      </MenuItem>
                    ))}
                    ))
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  name="usuario"
                  type="text"
                  fullWidth
                  label={'Usuario'}
                  value={nameUser}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={3}>
                <Box
                  fontWeight="fontWeightBold"
                  style={{ marginBottom: '10px' }}
                >
                  Venta por Plan:
                </Box>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Plan Funerario</InputLabel>
                  <Select
                    label="Tipo"
                    name="idTipoProducto"
                    value={getTypePlanId}
                    onChange={({ target: { value } }) =>
                      setGetTypePlanId(value)
                    }
                  >
                    <MenuItem disabled value="">
                      Seleccione Plan Funerario
                    </MenuItem>
                    {getTypePlan.map(({ idTipoPlan, tipo }) => (
                      <MenuItem key={idTipoPlan} value={idTipoPlan}>
                        {tipo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Box fontWeight="fontWeightBold">Producto:</Box>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title="Buscar Producto" placement="top">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#939393', color: '#fff' }}
                    aria-label="add"
                    component="span"
                    onClick={() => setOpenPopupSelecctProducto(true)}
                  >
                    <Search />
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title="Registrar Producto" placement="top">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#630F5C', color: '#fff' }}
                    aria-label="add"
                    component="span"
                    onClick={() => {
                      setOpenPopupProducto(true);
                    }}
                  >
                    <Add />
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  name="nombre"
                  type="text"
                  size="small"
                  label={descripcion ? '' : 'Nombre'}
                  value={descripcion}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  name="cantidad"
                  type="number"
                  size="small"
                  label="Cantidad"
                  fullWidth
                  value={cantidad}
                  onChange={({ target: { value, name } }) =>
                    handleChange({ value: parseInt(value), name })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  name="precio"
                  type="text"
                  size="small"
                  label={precio ? '' : 'Precio'}
                  value={precio}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#630F5C', color: '#fff' }}
                  startIcon={<Add />}
                  fullWidth
                  onClick={handleAddProduct}
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>ITBIS</InputLabel>
                  <Select
                    label="Tipo"
                    name="idItebis"
                    value={getItebisId}
                    onChange={({ target: { value } }) => setGetItebisId(value)}
                  >
                    <MenuItem disabled value="">
                      Seleccione ITBIS
                    </MenuItem>
                    {getItebis.map(({ porcentaje }) => (
                      <MenuItem key={porcentaje} value={porcentaje}>
                        {porcentaje}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  name="subTotal"
                  type="text"
                  fullWidth
                  label={'Subtotal'}
                  disabled={true}
                  value={getSubTotal.toString()}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  name="total"
                  type="text"
                  fullWidth
                  label={'Total'}
                  disabled={true}
                  value={getTotal.toString()}
                />
              </Grid>
              <Grid item xs={12}>
                <TableVenta
                  setProductBodySelect={setProductBodySelect}
                  productBodySelect={productBodySelect}
                  setGetTotal={setGetTotal}
                  setGetSubTotal={setGetSubTotal}
                  getItebisId={getItebisId}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Container style={{ marginLeft: drawerWidth }}>
        <Popup
          title={'Seleccionar Cliente'}
          openPopup={openPopupSelecctCliente}
          setOpenPopup={setOpenPopupSelecctCliente}
        >
          <TableSelectCliente
            setClientId={setClienteId}
            clientId={clienteId}
            getClienteSelect={setClienteName}
            setOpen={setOpenPopupSelecctCliente}
            isVenta={true}
            isSuscripcion={true}
          />
        </Popup>
        <Popup
          title={'Seleccionar Producto'}
          openPopup={openPopupSelecctProducto}
          setOpenPopup={setOpenPopupSelecctProducto}
        >
          <TableSelectProuct
            setProductoId={setProductoId}
            productoId={productoId}
            setProductBody={setProductBody}
            setOpen={setOpenPopupSelecctProducto}
          />
        </Popup>
        <Popup
          title="Registrar Cliente"
          openPopup={openPopupCliente}
          setOpenPopup={setOpenPopupCliente}
        >
          <FormCliente setOpenPopup={setOpenPopupCliente} />
        </Popup>
        <Popup
          title="Registrar Producto"
          openPopup={openPopupProducto}
          setOpenPopup={setOpenPopupProducto}
        >
          <ProductForm setOpenPopup={setOpenPopupProducto} />
        </Popup>
      </Container>
      {openDialogTransporte && (
        <Transporte
          setOpen={setOpenDialogTransporte}
          open={openDialogTransporte}
          employeId={employeId}
          setEmployeId={setEmployeId}
          vehiculoId={vehiculoId}
          setVehiculoId={setVehiculoId}
          getDireccion={getDireccion}
          setGetDireccion={setGetDireccion}
          handleSave={handleSave}
        />
      )}
      {openDialog && (
        <DialogSlide
          handleClose={handleClose}
          openDialog={openDialog}
          title={
            !errorServer ? 'Venta completada!' : 'La venta no se pudo completar'
          }
          body={
            !errorServer
              ? 'Su venta se ha completado correctamente.'
              : `El registro no se pudo completar. ${errorServer} `
          }
        />
      )}

      <Dialog
        open={openDialogIsTransporte}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialogIsTransporte(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Venta con Envío</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Desea realizar esta venta con envío?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenDialogIsTransporte(false);
              setOpenDialogTransporte(true);
            }}
          >
            Aceptar
          </Button>
          <Button
            onClick={() => {
              setOpenDialogIsTransporte(false);
              handleSave(false);
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Venta;
