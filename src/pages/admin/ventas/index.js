import React, { useState, useEffect, useContext } from 'react';
import {
  PeopleOutlineTwoTone,
  Cancel,
  ExitToApp,
  Search,
  Add,
} from '@material-ui/icons';
import {
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
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { drawerWidth } from '../../../utils/consts.js';

import TableVenta from './TableVenta';
import PageHeader from '../../../components/PageHeader';
import Popup from '../../../components/Popup.js';
import TableSelectCliente from '../clientes/TableSelectClient.js';
import FormCliente from '../clientes/Form.js';
import AppContext from '../../../auth/AuthContext.js';
import { get } from '../../../helpers/fetch.js';

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

const initialCliente = {
  nombre: '',
  apellido: '',
};

const Venta = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    state: {
      userData: { idUsuario, nombre: nameUser },
    },
  } = useContext(AppContext);
  const [openPopupProducto, setOpenPopupProducto] = useState(false);
  const [openPopupCliente, setOpenPopupCliente] = useState(false);
  const [openPopupSelecctCliente, setOpenPopupSelecctCliente] = useState(false);
  const [getTypePlan, setGetTypePlan] = useState([]);
  const [typePago, setTypePago] = useState([]);

  const [clienteId, setClienteId] = useState('');
  const [getTypePagoId, setGetTypePagoId] = useState('');
  const [getTypePlanId, setGetTypePlanId] = useState('');
  const [clienteName, setClienteName] = useState(initialCliente);

  const { nombre, apellido } = clienteName;

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

    fetchGetTypePlan();
    fetchGetTypePago();

    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <PageHeader
        className={classes.root}
        title="Ventas"
        subTitle="Registrar, consultar y actualizar"
        icon={<PeopleOutlineTwoTone fontSize="large" />}
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
                  startIcon={<ExitToApp />}
                  onClick={() => history.push('/admin/inventario')}
                >
                  Inventario
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
                  startIcon={<ExitToApp />}
                >
                  Imprimir
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#630F5C',
                    color: '#fff',
                  }}
                  className={classes.button}
                  startIcon={<ExitToApp />}
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
                  label={nameUser ? '' : 'Usuario'}
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
              <Grid item xs={3.8}>
                <Box fontWeight="fontWeightBold">Producto:</Box>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#939393', color: '#fff' }}
                  aria-label="add"
                  component="span"
                  onClick={() => setOpenPopupSelecctCliente(true)}
                >
                  <Search />
                </Button>
              </Grid>
              <Grid item xs={3}>
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
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  name="nombre"
                  type="text"
                  fullWidth
                  label="Nombre"
                  // error={Boolean(errors.nombre)}
                  //   helperText={errors.nombre ? 'El nombre es requerido' : ''}
                  /* inputRef={register({
                    required: true,
                  })}*/
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  name="cantidad"
                  type="text"
                  fullWidth
                  label="Cantidad"
                  // error={Boolean(errors.nombre)}
                  //   helperText={errors.nombre ? 'El nombre es requerido' : ''}
                  /* inputRef={register({
                    required: true,
                  })}*/
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  name="precio"
                  type="text"
                  fullWidth
                  label="Precio"
                  // error={Boolean(errors.nombre)}
                  //   helperText={errors.nombre ? 'El nombre es requerido' : ''}
                  /* inputRef={register({
                    required: true,
                  })}*/
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#630F5C', color: '#fff' }}
                  startIcon={<Add />}
                  fullWidth
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
                    name="idTipoProducto"
                    //value={}

                    /*onChange={({ target: { value, name } }) =>
                      handleChange({ value, name })
                    }*/
                  >
                    <MenuItem disabled value="">
                      Seleccione ITBIS
                    </MenuItem>
                    <MenuItem>18%</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  name="suplidor"
                  type="text"
                  label="Subtotal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  name="suplidor"
                  type="text"
                  label="Total"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TableVenta />
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
          title="Registrar Cliente"
          openPopup={openPopupCliente}
          setOpenPopup={setOpenPopupCliente}
        >
          <FormCliente setOpenPopup={setOpenPopupCliente} />
        </Popup>
      </Container>
    </div>
  );
};

export default Venta;
