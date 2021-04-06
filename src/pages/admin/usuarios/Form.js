import React, { useState, useEffect } from 'react';
import 'date-fns';
import {
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormGroup,
  Checkbox,
  OutlinedInput,
  Box,
  FormControlLabel,
  Button,
  makeStyles,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import { Visibility, VisibilityOff, Add, Search } from '@material-ui/icons';

import { DialogSlide } from '../../../components/alert/DialogSlide';

import Form from '../../../components/Form';
import { get, post, put } from '../../../helpers/fetch';
import TableSelectEmploye from '../employe/TableSelectEmploye';
import Popup from '../../../components/Popup';
import { drawerWidth } from '../../../utils/consts';
import { FormTipoUsuario } from './TipoUsuario';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
    textTransform: 'none',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    minWidth: 135,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  checkBoxGroup: {
    marginTop: theme.spacing(3),
  },
  addBtn: {
    height: '100%',
  },
  form: {
    width: 500,
    margin: theme.spacing(2),
  },
}));

let initialState = {
  usuario: '',
  password: '',
  idTipoUsuario: '',
};

const FormUsuario = ({ edit = false, body = {}, setOpenPopup }) => {
  const classes = useStyles();
  const [employeId, setEmployeId] = useState('');
  const [openPopupEmploye, setOpenPopupEmploye] = useState(false);
  const [openPopupTypeUser, setOpenPopupTypeUser] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [isUserSuccess, setIsUserSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getPermisos, setGetPermisos] = useState([]);
  const [getUserType, setGetUserType] = useState([]);
  const [userData, setUserData] = useState(initialState);

  const setAttributes = ({ openDialog = true, error = false }) => {
    setErrorSubmit(error);
    setOpenDialog(openDialog);
  };

  //PASSWORD FIELD
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  //SELECTS

  const { usuario, password, idTipoUsuario } = userData;

  useEffect(() => {
    const fetchGetUserType = async () => {
      await get('userType')
        .then((res) => res.json())
        .then(({ data }) => setGetUserType(data))
        .catch(() => {});
    };

    fetchGetUserType();

    if (edit) {
      const { usuario, idTipoUsuario, idEntidad } = body;

      setUserData({ ...userData, usuario, idTipoUsuario });
      setEmployeId(idEntidad);
    } else {
      cleanForm();
    }

    // eslint-disable-next-line
  }, [openPopupTypeUser]);

  useEffect(() => {
    const fetchGetPermisos = async () => {
      await get(`permisos/${idTipoUsuario}`)
        .then((res) => res.json())
        .then(({ data }) => setGetPermisos(data))
        .catch(() => {});
    };

    if (idTipoUsuario) {
      fetchGetPermisos();
    }
  }, [idTipoUsuario]);

  const cleanForm = () => {
    setUserData(initialState);
    setEmployeId('');
    setGetPermisos([]);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setErrorSubmit(false);
    if (isUserSuccess) {
      setOpenPopup(false);
      setIsUserSuccess(false);
    }
  };

  const handleChange = ({ value, name }) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.idTipoUsuario) {
      return setAttributes({
        openDialog: true,
        error:
          'Por favor verifique que el tipo de usuario este correctamente seleccionado',
      });
    }

    if (!userData.password) {
      return setAttributes({
        openDialog: true,
        error:
          'Por favor verifique que la contrasena este correctamente digitado',
      });
    }

    if (!userData.usuario) {
      return setAttributes({
        openDialog: true,
        error: 'Por favor verifique que el usuario este correctamente digitado',
      });
    }

    if (!employeId) {
      return setAttributes({
        openDialog: true,
        error:
          'Por favor verifique que el empleado este correctamente seleccionado',
      });
    }

    Object.assign(userData, { idEntidad: employeId });

    if (!edit) {
      return post('user/add', userData)
        .then(async (response) => {
          setLoading(false);
          if (response.status === 201) {
            setErrorSubmit(false);
            setIsUserSuccess(true);
            cleanForm();
          } else {
            const res = await response.json();
            setErrorSubmit(res.message);
          }
        })
        .catch((err) => setErrorSubmit(err.message))
        .finally(() => setOpenDialog(true));
    } else {
      Object.assign(userData, { idUsuario: body.idUsuario });

      return put('user', userData)
        .then((res) => res.json())
        .then(({ data }) => {
          if (data[0] === 1) {
            setErrorSubmit(false);
            setIsUserSuccess(true);
            cleanForm();
          }
        })
        .catch((err) => setErrorSubmit(err.message))
        .finally(() => setOpenDialog(true));
    }
  };

  return (
    <Form className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Tipo
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="idTipoUsuario"
                  value={idTipoUsuario}
                  onChange={({ target: { value, name } }) =>
                    handleChange({ value, name })
                  }
                  label="Tipo"
                >
                  <MenuItem disabled value="">
                    Seleccione su tipo
                  </MenuItem>
                  {getUserType.map(({ idTipoUsuario, tipo }) => (
                    <MenuItem key={idTipoUsuario} value={idTipoUsuario}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Button
                className={classes.addBtn}
                variant="contained"
                color="primary"
                aria-label="add"
                component="span"
                onClick={() => setOpenPopupTypeUser(true)}
              >
                <Add />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                variant="outlined"
                name="usuario"
                label="Usuario"
                type="text"
                value={usuario}
                onChange={({ target: { value, name } }) =>
                  handleChange({ value, name })
                }
                fullWidth
              />
              <FormControl className={classes.textField} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  name="password"
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={({ target: { value, name } }) =>
                    handleChange({ value, name })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            startIcon={<Search />}
            size="large"
            onClick={() => setOpenPopupEmploye(true)}
            style={
              employeId
                ? { backgroundColor: '#18AF18', color: '#fff' }
                : { backgroundColor: '#BCBFBC' }
            }
            className={classes.button}
          >
            {' '}
            Empleado
          </Button>

          <Box fontWeight="fontWeightBold" style={{ marginTop: 20 }}>
            Permisos:
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  {getPermisos.map(({ idPermiso, permiso }, i) => {
                    if (i < getPermisos.length / 2) {
                      return (
                        <FormControlLabel
                          key={`${idPermiso}/${i}`}
                          checked={true}
                          control={<Checkbox name={idPermiso} />}
                          label={permiso}
                        />
                      );
                    }
                    return <div></div>;
                  })}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  {getPermisos.map(({ idPermiso, permiso }, i) => {
                    if (i > getPermisos.length / 2) {
                      return (
                        <FormControlLabel
                          key={`${idPermiso}/${i}`}
                          checked={true}
                          control={<Checkbox name={idPermiso} />}
                          label={permiso}
                        />
                      );
                    }
                    return <div></div>;
                  })}
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <div style={{ marginTop: 20 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
              onClick={handleSubmit}
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
      </Grid>
      <Container style={{ marginLeft: drawerWidth }}>
        <Popup
          title={'Seleccionar Empleado'}
          openPopup={openPopupEmploye}
          setOpenPopup={setOpenPopupEmploye}
        >
          <TableSelectEmploye
            setEmployeId={setEmployeId}
            employeId={employeId}
            setOpen={setOpenPopupEmploye}
          />
        </Popup>
      </Container>
      {openPopupTypeUser && (
        <FormTipoUsuario
          setOpen={setOpenPopupTypeUser}
          open={openPopupTypeUser}
        />
      )}
      {openDialog && (
        <DialogSlide
          handleClose={handleClose}
          openDialog={openDialog}
          title={
            !errorSubmit
              ? edit
                ? 'Datos Actualizados!'
                : 'Registro completado!'
              : edit
              ? 'La Actualizacion no se pudo completar'
              : 'El registro no se pudo completar'
          }
          body={
            !errorSubmit
              ? edit
                ? 'Su Actualizacion se ha completado correctamente.'
                : 'Su registro se ha completado correctamente.'
              : `${
                  edit ? 'La  actualizacion' : 'El registro'
                } no se pudo completar. ${errorSubmit} `
          }
        />
      )}
    </Form>
  );
};

export default FormUsuario;
