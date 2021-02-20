import React, { useState } from 'react';
import 'date-fns';
import {
  Grid,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

import { formatDate } from '../helpers/formatDate';
import { post } from '../helpers/fetch';
import { email, phoneNumber, username } from '../utils/regExp';
import { isValidateForm } from '../helpers/isValidateForm';
import { DialogSlide } from '../components/alert/DialogSlide';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  login: {
    width: '100%',
    height: '365px',
    objectFit: 'cover',
    margin: 70,
  },
  contenidoLogin: {
    paddingTop: 25,
    paddingBottom: 250,
    justify: 'space-between',
    alignItems: 'center',
    direction: 'column',
    justifyContent: 'center',
  },
  logo: {
    width: '300px',
  },
  img: {
    minHeight: '100vh',
  },
  containerImg: {
    justify: 'center',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  paperStyle: {
    padding: 0,
    height: '75vh',
    width: 1200,
    margin: '20px auto',
  },
  loading: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const RegisterPage = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [showError, setShowError] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const { register, errors, getValues } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleClose = () => {
    setOpenDialog(false);
    setErrorServer(false);
    if (isSignUpSuccess) {
      setIsRedirect(true);
      setIsSignUpSuccess(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = getValues();
    const { email, telefono } = userData;
    if (telefono) {
      Object.assign(
        userData,
        {
          nacimiento: formatDate(selectedDate),
        },
        {
          correos: [email],
        },
        {
          telefonos: [{ telefono, tipo: 'casa' }],
        }
      );
    }

    if (isValidateForm(userData)) {
      setShowError(false);
      setLoading(true);
      return post('user/add', userData)
        .then(async (response) => {
          setLoading(false);
          if (response.status === 201) {
            setErrorServer(false);
            setIsSignUpSuccess(true);
          } else {
            const res = await response.json();
            setErrorServer(res.message);
          }
        })
        .catch((err) => setErrorServer(err.message))
        .finally(() => setOpenDialog(true));
    } else {
      setShowError(true);
    }
  };

  return (
    <Paper elevation={10} className={classes.paperStyle}>
      <Grid container className={classes.img}>
        <Grid item xs={12} sm={6}>
          <img
            src="images/imagenRegisterGrande.svg"
            className={classes.login}
            alt="imagenEmpresa"
          />
        </Grid>
        <Grid container item xs={12} sm={6} className={classes.contenidoLogin}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '400',
              minWidth: '300',
            }}
          >
            <Grid container className={classes.containerImg}>
              <img
                src="images/logoletras.JPG"
                alt="logo"
                className={classes.logo}
              />
            </Grid>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nombre"
                margin="normal"
                type="text"
                name="nombre"
                error={Boolean(errors.nombre)}
                helperText={errors.nombre ? 'El nombre es requerido' : ''}
                inputRef={register({
                  required: true,
                })}
              />
              <TextField
                label="Usuario"
                margin="normal"
                type="text"
                name="usuario"
                error={Boolean(errors.usuario)}
                helperText={errors.usuario ? 'El usuario es icorrecto' : ''}
                inputRef={register({
                  pattern: username,
                })}
              />
              <TextField
                label="Contraseña"
                margin="normal"
                type="password"
                name="password"
                error={Boolean(errors.password)}
                helperText={
                  errors.password ? 'Por favor colocar 8 caracteres o más' : ''
                }
                inputRef={register({
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'Por favor colocar 8 caracteres o más',
                  },
                })}
              />
              <TextField
                label="Confirmar Contraseña"
                margin="normal"
                type="password"
                name="confirPassword"
                error={Boolean(errors.confirPassword)}
                helperText={
                  errors.confirPassword ? 'Las contraseñas deben coincidir' : ''
                }
                inputRef={register({
                  required: true,
                  validate: (value) => value === getValues().password,
                })}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Fecha de Nacimiento"
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  required={true}
                />
              </MuiPickersUtilsProvider>
              <TextField
                label="Teléfono"
                margin="normal"
                name="telefono"
                error={Boolean(errors.telefono)}
                helperText={
                  errors.telefono ? 'El teléfono debe contener 10 dígitos' : ''
                }
                inputRef={register({
                  pattern: phoneNumber,
                  validate: (value) =>
                    value.replace(/[() -.]/g, '').length === 10,
                })}
              />
              <TextField
                label="Correo"
                margin="normal"
                type="email"
                name="email"
                error={Boolean(errors.email)}
                helperText={errors.email ? 'El correo es requerido' : ''}
                inputRef={register({
                  pattern: email,
                })}
              />

              <div style={{ height: 20 }} />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={Object.keys(errors).some(
                  (key) => !!errors[key] === true
                )}
              >
                {loading ? (
                  <div className={classes.loading}>
                    <CircularProgress />
                  </div>
                ) : (
                  'Registrar'
                )}
              </Button>
            </form>
            {showError && (
              <h4 style={{ color: 'red' }}>
                Todos los campos son requeridos *
              </h4>
            )}
          </div>
        </Grid>
      </Grid>
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
      {isRedirect && <Redirect to="/login" />}
    </Paper>
  );
};

export default RegisterPage;
