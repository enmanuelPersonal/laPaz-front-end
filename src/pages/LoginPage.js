import React, { useContext, useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from '../auth/AuthContext';
import { useForm } from 'react-hook-form';
import { username } from '../utils/regExp';
import { Redirect } from 'react-router-dom';
import { isValidateForm } from '../helpers/isValidateForm';
import { post } from '../helpers/fetch';
import { USER_LOGIN } from '../auth/actions';

const useStyles = makeStyles((theme) => ({
  login: {
    width: '100%',
    height: '365px',
    objectFit: 'cover',
    marginTop: 70,
  },
  contenidoLogin: {
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
    height: '70vh',
    width: 1050,
    margin: '50px auto',
  },
  loading: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  labelMessage: {
    color: 'red',
    fontSize: 17,
    fontWeight: 100,
    textAlign: 'center',
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const { dispatch } = useContext(AppContext);
  const [isRedirect, setIsRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const { register, errors, getValues } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = getValues();

    if (isValidateForm(userData)) {
      setLoading(true);
      await post('auth/login', userData)
        .then((response) => {
          setLoading(false);
          switch (response.status) {
            case 200:
              return response.json();
            case 401:
              throw Error('Credenciales inválidas');
            case 404:
              throw Error('Usuario invalido');
            default:
              throw Error('Error en el servidor');
          }
        })
        .then(({ login, token, ...payload }) => {
          const { tipoUsuario, idEntidad, nombre, permisos } = payload.data;
          localStorage.setItem('LaPaz_auth_token', token);

          if (!login) {
            setSignInError(true);
            return;
          } else {
            dispatch({
              type: USER_LOGIN,
              payload: {
                tipoUsuario,
                idEntidad,
                nombre,
                permisos,
              },
            });
            setIsRedirect(true);
          }
        })
        .catch((err) => {
          setSignInError(err.message);
        });
    } else {
      setIsRedirect(false);
      setSignInError('Campos incompletos');
    }
  };

  return (
    <Paper elevation={10} className={classes.paperStyle}>
      <div>
        <Grid container className={classes.img}>
          <Grid item xs={12} sm={6}>
            <img
              src="images/imagenLoginGrande.svg"
              className={classes.login}
              alt="imagenEmpresa"
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            className={classes.contenidoLogin}
          >
            <div />
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
                  label="Usuario"
                  margin="normal"
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
                  name="password"
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? 'Por favor colocar 8 caracteres o más'
                      : ''
                  }
                  inputRef={register({
                    required: true,
                    minLength: {
                      value: 8,
                      message: 'Por favor colocar 8 caracteres o más',
                    },
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
                      <CircularProgress color="secondary" />
                    </div>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
              {signInError && (
                <h1 className={classes.labelMessage}>{signInError}</h1>
              )}
            </div>
            <div />
          </Grid>
        </Grid>
      </div>
      {isRedirect && <Redirect to="/home" />}
    </Paper>
  );
};

export default LoginPage;
