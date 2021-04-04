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
  FormGroup,
  Checkbox,
  OutlinedInput,
  Box,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
  Button,
  makeStyles,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Visibility, VisibilityOff, Add } from '@material-ui/icons';
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

const FormUsuario = ({
  edit = false,
  body = {},
  setOpenPopup,
  isSuscripcion = false,
}) => {
  const classes = useStyles();

  //PASSWORD FIELD
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  //SELECTS
  const [tipo, setTipo] = React.useState('');

  const handleChangeType = (event) => {
    setTipo(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
                  value={tipo}
                  onChange={handleChangeType}
                  label="Tipo"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Administrador</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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
              >
                <Add />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                variant="outlined"
                name="nombre"
                label="Nombre completo"
                type="text"
                fullWidth
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                name="telefono"
                label="Teléfono"
                type="text"
                fullWidth
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                name="nombre"
                label="Nombre de Usuario"
                type="text"
                fullWidth
              />
              <FormControl className={classes.textField} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  // onChange={handleChange('password')}
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
        <Grid item xs={3}>
          <Box fontWeight="fontWeightBold">Permisos:</Box>
          <FormGroup column>
            <FormControlLabel
              control={
                <Checkbox
                  checked
                  // onChange={handleChange}
                  name="checkedA"
                  color="primary"
                />
              }
              label="Dashboard"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked
                  //onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Reportes"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked
                  // onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Inventario"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked
                  //onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Planes"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={3}>
          <FormGroup column className={classes.checkBoxGroup}>
            <FormControlLabel
              control={
                <Checkbox
                  checked
                  //  onChange={handleChange}
                  name="checkedA"
                  color="primary"
                />
              }
              label="Suscripción"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked
                  // onChange={handleChange}
                  name="checkedA"
                  color="primary"
                />
              }
              label="Ventas"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked
                  // onChange={handleChange}
                  name="checkedA"
                  color="primary"
                />
              }
              label="Compras"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked
                  // onChange={handleChange}
                  name="checkedA"
                  color="primary"
                />
              }
              label="Usuarios"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Form>
  );
};

export default FormUsuario;
