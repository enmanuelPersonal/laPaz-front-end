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
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useForm } from 'react-hook-form';

import { DialogSlide } from '../../../components/alert/DialogSlide';

import Form from '../../../components/Form';
import { get, post } from '../../../helpers/fetch';
import { Cargos } from '../../../components/Cargos';
import { Direccion } from '../../../components/Direccion';
import { formatDate } from '../../../helpers/formatDate';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
    textTransform: 'none',
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

const FormEmploye = ({ addOrEdit }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [isEmployeSuccess, setIsEmployeSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openCargo, setOpenCargo] = useState(false);
  const [getCargo, setGetCargo] = useState([]);
  const [openDireccion, setOpenDireccion] = useState(false);
  const [getDireccion, setGetDireccion] = useState([]);
  const [typeIdentity, setTypeIdentity] = useState([]);
  const [getTypeIdentity, setGetTypeIdentity] = useState('');
  const [getTypePhone, setGetTypePhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [getGenero, setGetGenero] = useState('');
  const [loadingTypeIdentity, setLoadingTypeIdentity] = useState(true);
  const { register, errors, getValues } = useForm({
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
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
    setErrorServer(false);
    if (isEmployeSuccess) {
      setIsEmployeSuccess(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = getValues();
    const { correos, telefonos, identidades } = userData;
    Object.assign(
      userData,
      { correos: [correos] },
      { telefonos: [{ telefono: telefonos, tipo: getTypePhone }] },
      {
        identidades: {
          identidad: identidades,
          idTipoIdentidad: getTypeIdentity,
        },
      },
      { cargos: getCargo },
      { direcciones: getDireccion },
      { nacimiento: formatDate(selectedDate) },
      { sexo: getGenero }
    );
    console.log(userData);

    return post('employe/add', userData)
      .then(async (response) => {
        setLoading(false);
        if (response.status === 201) {
          setErrorServer(false);
          setIsEmployeSuccess(true);
        } else {
          const res = await response.json();
          setErrorServer(res.message);
        }
      })
      .catch((err) => setErrorServer(err.message))
      .finally(() => setOpenDialog(true));
    //     addOrEdit(values, resetForm);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
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
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenCargo(true)}
            style={
              getCargo.length
                ? { backgroundColor: '#18AF18', color: '#fff' }
                : { backgroundColor: '#BCBFBC' }
            }
            className={classes.button}
          >
            {' '}
            Seleccionar Cargos
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenDireccion(true)}
            style={
              getDireccion.length
                ? { backgroundColor: '#18AF18', color: '#fff' }
                : { backgroundColor: '#BCBFBC' }
            }
            className={classes.button}
          >
            {' '}
            Registrar Direccion
          </Button>
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
                'Guardar'
              )}
            </Button>
            <Button
              variant="contained"
              size="large"
              color="inherit"
              className={classes.button}
            >
              {' '}
              Limpiar
            </Button>
          </div>
        </Grid>
        {openCargo && (
          <Cargos
            setOpen={setOpenCargo}
            open={openCargo}
            setGetCargos={setGetCargo}
            getCargo={getCargo}
          />
        )}
        {openDireccion && (
          <Direccion
            setOpen={setOpenDireccion}
            open={openDireccion}
            setGetDireccion={setGetDireccion}
            getDireccion={getDireccion}
          />
        )}
        {openDialog && (
          <DialogSlide
            handleClose={handleClose}
            openDialog={openDialog}
            title={
              !errorServer
                ? 'Registro completado!'
                : 'El registro no se pudo completar'
            }
            body={
              !errorServer
                ? 'Su registro se ha completado correctamente.'
                : `El registro no se pudo completar. ${errorServer} `
            }
          />
        )}
      </Grid>
    </Form>
  );
};

export default FormEmploye;
