import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, makeStyles, Box } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Search } from '@material-ui/icons';

import Form from '../../../components/Form';
const { REACT_APP_API_URL } = process.env;

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
    textTransform: 'none',
  },
  textField: {
    width: '20ch',
  },
  input: {
    display: 'none',
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

const FormDifuntos = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(Date.now());

  return (
    <Form style={{ width: 800 }}>
      <Grid container>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                name="cliente"
                label="Propietario Suscripción"
                type="text"
                style={{ maxWidth: 200 }}
              />
            </Grid>

            <Grid item xs={2}>
              <Box>
                <Button
                  variant="contained"
                  className={classes.btn}
                  style={{
                    backgroundColor: '#939393',
                    color: '#fff',
                    marginTop: 15,
                  }}
                  aria-label="add"
                  component="span"
                >
                  <Search />
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              name="nombre"
              label="Nombre Difunto"
              type="text"
              style={{ maxWidth: 200 }}
            />
            <Box justifyContet="flex-start">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  id="date-picker-dialog"
                  label="Fecha de Pago"
                  disabled
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={3} lg={4}>
          <Box
            border={1}
            mb={2}
            mt={3}
            style={{ height: 200, width: 200 }}
            display="flex"
            justifyContent="center"
          >
            <img
              style={{ height: 200, width: 200 }}
              //src={`${REACT_APP_API_URL}/uploads/${url}`}
              alt="Acta Defunción"
            />
          </Box>
          <input
            className={classes.input}
            id="contained-button-file"
            type="file"
            // onChange={}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              style={{ marginTop: 20 }}
            >
              Subir imagen
            </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          <div style={{ marginTop: 30 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
            >
              GUARDAR
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default FormDifuntos;
