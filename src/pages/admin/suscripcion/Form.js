import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  makeStyles,
  CircularProgress,
  Container,
  Divider,
  Tooltip,
} from '@material-ui/core';

import { Add, Search, CheckCircle } from '@material-ui/icons';

import { DialogSlide } from '../../../components/alert/DialogSlide';

import Form from '../../../components/Form';
import { get, post, put } from '../../../helpers/fetch';
import Popup from '../../../components/Popup';
import { drawerWidth } from '../../../utils/consts';
import FormCliente from '../clientes/Form';
import FormPariente from '../parientes/Form';
import TablePariente from './TableParientes';
import TableSelectCliente from '../clientes/TableSelectClient';
import TableSelectParientes from '../parientes/TableSelectParientes';
import AppContext from '../../../auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
    textTransform: 'none',
  },
  textField: {
    width: '20ch',
  },
  divider: {
    marginBottom: 5,
    marginTop: 5,
  },
}));

const stados = ['Cancelada', 'Aceptada', 'Proceso'];

const FormSuscripcion = ({ edit = false, body = {}, setOpenPopup }) => {
  const classes = useStyles();
  const {
    state: {
      userData: { idUsuario },
    },
  } = useContext(AppContext);
  const [openPopupClient, setOpenPopupClient] = useState(false);
  const [openPopupParientes, setOpenPopupParientes] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCliente, setOpenDialogCliente] = useState(false);
  const [openDialogPariente, setOpenDialogPariente] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [isSuscripcionSuccess, setIsSuscripcionSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingTypePlan, setLoadingTypePlan] = useState(true);
  const [typePlan, setTypePlan] = useState([]);

  const [cliente, setCliente] = useState({});
  const [parientes, setParientes] = useState([]);
  const [getTypePlan, setGetTypePlan] = useState('');
  const [getStado, setGetStado] = useState('Proceso');
  const [getMonto, setGetMonto] = useState('');
  const [getCuotas, setGetCuotas] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientEntidadId, setClientEntidadId] = useState('');

  const setAttributes = ({ openDialog = true, error = false }) => {
    setErrorServer(error);
    setOpenDialog(openDialog);
  };

  useEffect(() => {
    const fetchTypePlan = async () => {
      await get('typePlan')
        .then((res) => res.json())
        .then(({ data }) => {
          setTypePlan(data);
        })
        .catch(() => {})
        .finally(() => {
          setLoadingTypePlan(false);
        });
    };
    if (typePlan && !typePlan.length) fetchTypePlan();

    if (edit) {
      const {
        idEntidad,
        idCliente,
        nombre,
        apellido,
        cuotas,
        idTipoPlan,
        identidades,
        monto,
        parientes,
        statusSuscripcion,
      } = body;
      setGetStado(statusSuscripcion);
      setClientEntidadId(idEntidad);
      setCliente({ client: { nombre, apellido, identidades } });
      setGetTypePlan(idTipoPlan);
      setGetMonto(monto);
      setGetCuotas(cuotas);
      setParientes(parientes);
      setClientId(idCliente);
    } else {
      cleanForm();
    }
    // eslint-disable-next-line
  }, []);

  const handleChangeTypePlan = ({ target: { value } }) => {
    typePlan.forEach(({ idTipoPlan, monto }) => {
      if (idTipoPlan === value) {
        setGetCuotas(monto);
        setGetMonto(monto * 3);
        return;
      }
    });
    setGetTypePlan(value);
  };

  const cleanForm = () => {
    setGetTypePlan('');
    setCliente({});
    setGetMonto('');
    setGetCuotas('');
    setParientes([]);
    setGetStado('Proceso');
  };

  const handleClose = () => {
    setOpenDialog(false);
    setErrorServer(false);
    if (isSuscripcionSuccess) {
      setOpenPopup(false);
      setIsSuscripcionSuccess(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = cliente;

    if (!userData.client?.nombre) {
      return setAttributes({
        openDialog: true,
        error: 'Por favor verifique que el cliente este correctamente digitado',
      });
    }

    if (!getTypePlan) {
      return setAttributes({
        openDialog: true,
        error:
          'Por favor verifique que el plan este correctamente seleccionado',
      });
    }

    if (!edit) {
      Object.assign(
        userData,
        { parientes: parientes },
        { idTipoPlan: getTypePlan },
        { monto: getMonto },
        { idUsuario },
        { status: getStado }
      );

      return post('suscripcion/add', userData)
        .then(async (response) => {
          setLoading(false);
          if (response.status === 201) {
            setErrorServer(false);
            setIsSuscripcionSuccess(true);
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
    } else {
      const userData = {};
      const { idSuscripcion } = body;

      const getParientes = parientes.map(({ idEntidad }) => {
        return idEntidad;
      });

      Object.assign(
        userData,
        { idUsuario },
        { idCliente: clientId },
        { idSuscripcion },
        { idParientes: getParientes },
        { idTipoPlan: getTypePlan },
        { monto: getMonto },
        { idClienteEntidad: clientEntidadId },
        { status: getStado }
      );

      return put('suscripcion', userData)
        .then((res) => res.json())
        .then(({ data }) => {
          if (data[0] === 1) {
            setErrorServer(false);
            setIsSuscripcionSuccess(true);
            cleanForm();
          }
        })
        .catch((err) =>
          setErrorServer('Verifique que todos los campos esten correctos')
        )
        .finally(() => setOpenDialog(true));
    }
  };

  return (
    <Form>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FormControl variant="outlined">
            <InputLabel>Tipo de Plan</InputLabel>
            <Select
              label="Tipo de Plan"
              name="idTipoIdentidad"
              value={getTypePlan}
              onChange={handleChangeTypePlan}
              disabled={loadingTypePlan}
            >
              <MenuItem disabled value="">
                Seleccione su tipo de Plan
              </MenuItem>
              {typePlan.map(({ idTipoPlan, tipo }) => (
                <MenuItem key={idTipoPlan} value={idTipoPlan}>
                  {tipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            name="monto"
            label="Monto"
            type="text"
            value={getMonto}
            disabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            name="cuotas"
            label="Cuotas Mensuales"
            type="text"
            value={getCuotas}
            disabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="outlined">
            <InputLabel>Estado Suscripcion</InputLabel>
            <Select
              label="Estado Suscripcion"
              name="stado"
              value={getStado}
              onChange={({ target: { value } }) => setGetStado(value)}
            >
              <MenuItem disabled value="">
                Seleccione su estado de suscripcion
              </MenuItem>
              {stados.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} style={{ margin: '-20px auto -40px 10px' }}>
          <Divider className={classes.divider} />
          <h3>Cliente</h3>
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            name="Nombre"
            type="text"
            label={cliente?.client ? '' : 'Nombre'}
            value={cliente?.client?.nombre || ''}
            disabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={classes.textField}
            variant="outlined"
            name="identidad"
            type="text"
            label={cliente?.client ? '' : 'Num. Documento'}
            value={cliente?.client?.identidades?.identidad || ''}
            disabled={true}
          />
        </Grid>
        <Grid item xs={4}>
          {!edit ? (
            <Tooltip title="Registrar Cliente" placement="top">
              <Button
                variant="contained"
                size="large"
                onClick={() => setOpenDialogCliente(true)}
                style={
                  cliente.client?.nombre
                    ? { backgroundColor: '#18AF18', color: '#fff' }
                    : { backgroundColor: '#BCBFBC' }
                }
                className={classes.button}
              >
                {cliente.client ? (
                  <CheckCircle style={{ marginRight: 8 }} />
                ) : (
                  <Add style={{ marginRight: 8 }} />
                )}
                Cliente
              </Button>
            </Tooltip>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={() => setOpenPopupClient(true)}
              startIcon={<Search />}
              style={
                clientId
                  ? { backgroundColor: '#18AF18', color: '#fff' }
                  : { backgroundColor: '#BCBFBC' }
              }
              className={classes.button}
            >
              Cliente
            </Button>
          )}
        </Grid>
        <Grid item xs={12} style={{ margin: '-20px auto -40px auto' }}>
          <Divider className={classes.divider} />
          <h3 style={{ marginBottom: 25 }}>Parientes</h3>
        </Grid>

        <Grid item xs={2}>
          {!edit ? (
            <Tooltip title="Agregar Pariente" placement="right">
              <Button
                variant="contained"
                size="large"
                onClick={() => setOpenDialogPariente(true)}
                mb={3}
                className={classes.button}
                style={
                  parientes.length
                    ? { backgroundColor: '#18AF18', color: '#fff' }
                    : { backgroundColor: '#BCBFBC' }
                }
              >
                {parientes.length ? (
                  <CheckCircle style={{ marginRight: 8 }} />
                ) : (
                  <Add style={{ marginRight: 8 }} />
                )}
                Parientes
              </Button>
            </Tooltip>
          ) : (
            <Button
              variant="contained"
              size="large"
              startIcon={<Search />}
              onClick={() => setOpenPopupParientes(true)}
              className={classes.button}
              style={
                clientId
                  ? { backgroundColor: '#18AF18', color: '#fff' }
                  : { backgroundColor: '#BCBFBC' }
              }
            >
              Parientes
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <TablePariente
            edit={edit}
            parientes={parientes}
            setParientes={setParientes}
          />
        </Grid>

        <Grid item xs={6}>
          <div style={{ marginTop: 50 }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
            >
              {loading ? (
                <div className={classes.loading}>
                  <CircularProgress />
                </div>
              ) : (
                `${edit ? 'ACTUALIZAR' : 'GUARDAR'}`
              )}
            </Button>
            <Button
              variant="contained"
              size="large"
              color="inherit"
              className={classes.button}
              onClick={cleanForm}
            >
              LIMPIAR
            </Button>
          </div>
        </Grid>
        <Container style={{ marginLeft: drawerWidth }}>
          <Popup
            title={'Nuevo Cliente'}
            openPopup={openDialogCliente}
            setOpenPopup={setOpenDialogCliente}
          >
            <FormCliente
              setOpenPopup={setOpenDialogCliente}
              setCliente={setCliente}
              isSuscripcion={true}
            />
          </Popup>
          <Popup
            title={'Seleccionar Cliente'}
            openPopup={openPopupClient}
            setOpenPopup={setOpenPopupClient}
          >
            <TableSelectCliente
              setClientEntidadId={setClientEntidadId}
              setClientId={setClientId}
              clientId={clientId}
              getClienteSelect={setCliente}
              setOpen={setOpenPopupClient}
              isSuscripcion={true}
            />
          </Popup>
          <Popup
            title={'Seleccionar Parientes'}
            openPopup={openPopupParientes}
            setOpenPopup={setOpenPopupParientes}
          >
            <TableSelectParientes
              setParientesIds={setParientes}
              parientesIds={parientes}
              idCliente={clientId}
              setOpen={setOpenPopupParientes}
              isSuscripcion={true}
            />
          </Popup>
        </Container>
        <Container style={{ marginLeft: drawerWidth }}>
          <Popup
            title={'Nuevo Pariente'}
            openPopup={openDialogPariente}
            setOpenPopup={setOpenDialogPariente}
          >
            <FormPariente
              setOpenPopup={setOpenDialogPariente}
              setParientes={setParientes}
              getParientes={parientes}
              isSuscripcion={true}
            />
          </Popup>
        </Container>
        {openDialog && (
          <DialogSlide
            handleClose={handleClose}
            openDialog={openDialog}
            title={
              !errorServer
                ? edit
                  ? 'Datos Actualizados!'
                  : 'Registro completado!'
                : edit
                ? 'La Actualizacion no se pudo completar'
                : 'El registro no se pudo completar'
            }
            body={
              !errorServer
                ? edit
                  ? 'Su Actualizacion se ha completado correctamente.'
                  : 'Su registro se ha completado correctamente.'
                : `${
                    edit ? 'La  actualizacion' : 'El registro'
                  } no se pudo completar. ${errorServer} `
            }
          />
        )}
      </Grid>
    </Form>
  );
};

export default FormSuscripcion;
