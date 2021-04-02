import React, { useState, useEffect } from 'react';
import 'date-fns';
import {
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
  Button,
  makeStyles,
  CircularProgress,
  Container,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useForm } from 'react-hook-form';

import { DialogSlide } from '../../../components/alert/DialogSlide';

import Form from '../../../components/Form';
import { get, post, put } from '../../../helpers/fetch';
// import { Direccion } from '../../../components/Direccion';
import { formatDate } from '../../../helpers/formatDate';
import TableSelectClient from '../clientes/TableSelectClient';
import Popup from '../../../components/Popup';
import { drawerWidth } from '../../../utils/consts';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
    textTransform: 'none',
  },
  textField: {
    width: '20ch',
  },
}));

const genderItems = [
  { id: 'M', genero: 'M' },
  { id: 'F', genero: 'F' },
  { id: 'Otro', genero: 'Otro' },
];

const phoneItems = [
  { id: 'casa', tipo: 'Casa' },
  { id: 'celular', tipo: 'Celular' },
];

const FormPariente = ({
  edit = false,
  body = {},
  setOpenPopup,
  setParientes,
  getParientes,
  isSuscripcion = false,
}) => {
  const classes = useStyles();
  const [openPopupClient, setOpenPopupClient] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [isParienteSuccess, setIsParienteSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingTypeIdentity, setLoadingTypeIdentity] = useState(true);
  // const [openDireccion, setOpenDireccion] = useState(false);
  const [typeIdentity, setTypeIdentity] = useState([]);

  // const [getDireccion, setGetDireccion] = useState([]);
  const [getTypeIdentity, setGetTypeIdentity] = useState('');
  const [clientId, setClientId] = useState('');
  const [getTypePhone, setGetTypePhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [getGenero, setGetGenero] = useState('');
  const { register, errors, getValues, setValue, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    const fetchTypeIdentity = async () => {
      await get('typeIdentity')
        .then((res) => res.json())
        .then(({ data }) => setTypeIdentity(data))
        .catch(() => {})
        .finally(() => {
          setLoadingTypeIdentity(false);
        });
    };
    if (typeIdentity && !typeIdentity.length) fetchTypeIdentity();

    if (edit) {
      const {
        nombre,
        apellido,
        // calleName,
        // casa: { numero, referencia },
        // ciudadName,
        correos,
        identidades,
        // municipioName,
        // paisName,
        // regionName,
        // sectorName,
        nacimiento,
        sexo,
        telefonos = [],
        idCliente,
      } = body;

      let getResPhone = '';
      let getResTypePhone = '';
      let getResCorreo = '';
      let getResIdTipoIdentidad = '';
      let getResSerie = '';

      if (telefonos.length) {
        const { telefono, tipo } = telefonos[0];
        getResPhone = telefono;
        getResTypePhone = tipo;
      }

      if (correos.length) {
        const { correo } = correos[0];
        getResCorreo = correo;
      }

      if (identidades.length) {
        const { idTipoIdentidad, serie } = identidades[0];
        getResIdTipoIdentidad = idTipoIdentidad;
        getResSerie = serie;
      }

      // setGetDireccion([
      //   {
      //     pais: paisName,
      //     region: regionName,
      //     ciudad: ciudadName,
      //     municipio: municipioName,
      //     sector: sectorName,
      //     calle: calleName,
      //     casa: numero,
      //     referencia,
      //   },
      // ]);
      setClientId(idCliente);
      setGetTypeIdentity(getResIdTipoIdentidad);
      setGetTypePhone(getResTypePhone);
      setSelectedDate(new Date(nacimiento));
      setGetGenero(sexo);
      setValue('nombre', nombre);
      setValue('correos', getResCorreo);
      setValue('identidades', getResSerie);
      setValue('telefonos', getResPhone);
      setValue('apellido', apellido);
    } else {
      cleanForm();
    }
    // eslint-disable-next-line
  }, []);

  const cleanForm = () => {
    reset();
    // setGetDireccion([]);
    setGetTypeIdentity('');
    setGetTypePhone('');
    setSelectedDate(Date.now());
    setGetGenero('');
    setClientId('');
  };

  const handleClose = () => {
    setOpenDialog(false);
    setErrorServer(false);
    if (isParienteSuccess) {
      setOpenPopup(false);
      setIsParienteSuccess(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = getValues();
    const { correos, telefonos, identidades } = userData;

    if (isSuscripcion) {
      Object.assign(
        userData,
        { correos: correos ? [correos] : [] },
        {
          telefonos: telefonos
            ? [{ telefono: telefonos, tipo: getTypePhone }]
            : [],
        },
        {
          identidades: identidades
            ? {
                identidad: identidades,
                idTipoIdentidad: getTypeIdentity,
              }
            : '',
        },
        { nacimiento: formatDate(selectedDate) },
        { sexo: getGenero }
      );

      setParientes([...getParientes, { ...userData }]);
      setOpenPopup(false);
      return;
    }

    if (!edit) {
      Object.assign(
        userData,
        { correos: correos ? [correos] : [] },
        {
          telefonos: telefonos
            ? [{ telefono: telefonos, tipo: getTypePhone }]
            : [],
        },
        {
          identidades: identidades
            ? {
                identidad: identidades,
                idTipoIdentidad: getTypeIdentity,
              }
            : '',
        },
        // { direcciones: getDireccion },
        { nacimiento: formatDate(selectedDate) },
        { sexo: getGenero },
        { idCliente: clientId }
      );

      return post('pariente/add', userData)
        .then(async (response) => {
          setLoading(false);
          if (response.status === 201) {
            setErrorServer(false);
            setIsParienteSuccess(true);
            cleanForm();
          } else {
            const res = await response.json();
            setErrorServer(res.message);
          }
        })
        .catch((err) => setErrorServer(err.message))
        .finally(() => setOpenDialog(true));
    } else {
      const {
        idPariente,
        idCliente,
        idIdentidad,
        idEntidad,
        idPersona,
        telefonos: bodyTelefonos,
        correos: bodyCorreos,
        // direcciones,
      } = body;
      const { idTelefono } = bodyTelefonos[0];
      const { idCorreo } = bodyCorreos[0];
      // const { idDireccion } = direcciones[0];
      // const getDirecciones = getDireccion[0];

      // Object.assign(getDirecciones, { idDireccion });

      Object.assign(
        userData,
        { idPariente },
        { idCliente },
        { idIdentidad },
        { idEntidad },
        { idPersona },
        { correos: [{ idCorreo, correo: correos }] },
        {
          telefonos: [{ idTelefono, telefono: telefonos, tipo: getTypePhone }],
        },
        {
          identidades: {
            identidad: identidades,
            idTipoIdentidad: getTypeIdentity,
          },
        },
        // { direcciones: [getDirecciones] },
        { nacimiento: formatDate(selectedDate) },
        { sexo: getGenero }
      );

      return put('pariente', userData)
        .then((res) => res.json())
        .then(({ data }) => {
          if (data[0] === 1) {
            setErrorServer(false);
            setIsParienteSuccess(true);
            cleanForm();
          }
        })
        .catch((err) => setErrorServer(err.message))
        .finally(() => setOpenDialog(true));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            name="nombre"
            label="Nombre"
            type="text"
            error={Boolean(errors.nombre)}
            helperText={errors.nombre ? 'El nombre es requerido' : ''}
            inputRef={register({
              required: true,
            })}
          />

          <TextField
            className={classes.textField}
            variant="outlined"
            label="Email"
            name="correos"
            type="email"
            error={Boolean(errors.correos)}
            helperText={errors.correos ? 'El correo es requerido' : ''}
            inputRef={register({
              required: true,
            })}
          />

          <div style={{ display: 'flex' }}>
            <TextField
              variant="outlined"
              label="Num. Documento"
              name="identidades"
              error={Boolean(errors.identidades)}
              helperText={
                errors.identidades ? 'El numero de Identidad es requerido' : ''
              }
              inputRef={register({
                required: true,
              })}
            />
            <FormControl variant="outlined">
              <InputLabel>Tipo de Documento</InputLabel>
              <Select
                label="Tipo de Documento"
                name="idTipoIdentidad"
                value={getTypeIdentity}
                onChange={({ target: { value } }) => setGetTypeIdentity(value)}
                disabled={loadingTypeIdentity}
              >
                <MenuItem disabled value="">
                  Seleccione su tipo de documento
                </MenuItem>
                {typeIdentity.map(({ idTipoIdentidad, tipo }) => (
                  <MenuItem key={idTipoIdentidad} value={idTipoIdentidad}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div style={{ display: 'flex' }}>
            <TextField
              variant="outlined"
              label="Num. Telefono"
              name="telefonos"
              error={Boolean(errors.telefonos)}
              helperText={errors.telefonos ? 'El telefono es requerido' : ''}
              inputRef={register({
                required: true,
              })}
            />
            <FormControl variant="outlined">
              <InputLabel>Tipo de Telefono</InputLabel>
              <Select
                label="Tipo de Telefono"
                name="tipoTelefono"
                value={getTypePhone}
                onChange={({ target: { value } }) => setGetTypePhone(value)}
              >
                <MenuItem disabled value="">
                  Seleccione su tipo de Telefono
                </MenuItem>
                {phoneItems.map(({ id, tipo }) => (
                  <MenuItem key={id} value={id}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            name="apellido"
            label="Apellidos"
            type="text"
            error={Boolean(errors.apellido)}
            helperText={errors.apellido ? 'El apellido es requerido' : ''}
            inputRef={register({
              required: true,
            })}
          />
          <FormControl>
            <FormLabel>Genero</FormLabel>
            <MuiRadioGroup
              row
              name="sexo"
              value={getGenero}
              onChange={({ target: { value } }) => setGetGenero(value)}
            >
              {genderItems.map(({ id, genero }) => (
                <FormControlLabel
                  key={id}
                  value={id}
                  control={<Radio />}
                  label={genero}
                />
              ))}
            </MuiRadioGroup>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              variant="outlined"
              fullWidth
              margin="normal"
              id="date-picker-dialog"
              label="Fecha de Nacimiento"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              required={true}
            />
          </MuiPickersUtilsProvider>
          {!isSuscripcion ? (
            <Button
              variant="contained"
              size="large"
              onClick={() => setOpenPopupClient(true)}
              style={
                clientId
                  ? { backgroundColor: '#18AF18', color: '#fff' }
                  : { backgroundColor: '#BCBFBC' }
              }
              className={classes.button}
            >
              {' '}
              Seleccionar Cliente
            </Button>
          ) : (
            <div style={{ marginBottom: 90 }}></div>
          )}

          <div style={{ marginTop: 50 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
              disabled={Object.keys(errors).some(
                (key) => !!errors[key] === true
              )}
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
              {' '}
              LIMPIAR
            </Button>
          </div>
        </Grid>
        <Container style={{ marginLeft: drawerWidth }}>
          <Popup
            title={'Seleccionar Cliente'}
            openPopup={openPopupClient}
            setOpenPopup={setOpenPopupClient}
          >
            <TableSelectClient
              setClientId={setClientId}
              clientId={clientId}
              setOpen={setOpenPopupClient}
            />
          </Popup>
        </Container>
        {/* {openPopupClient && (
          <TableSelectClient />
          // <Direccion
          //   setOpen={setOpenDireccion}
          //   open={openDireccion}
          //   setGetDireccion={setGetDireccion}
          //   getDireccion={getDireccion}
          // />
        )} */}
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

export default FormPariente;
