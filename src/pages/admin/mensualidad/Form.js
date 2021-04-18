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

const FormMensualidad = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(Date.now());
  return (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="cliente"
                label="Cliente"
                type="text"
                style={{ maxWidth: 235 }}
              />
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-start">
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
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            name="cantidad"
            label="Cantidad Meses"
            type="text"
            style={{ maxWidth: 150 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            name="monto"
            label="Monto"
            type="text"
            style={{ maxWidth: 180 }}
          />
        </Grid>
        <Grid>
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
              required={true}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </Form>
  );
};

export default FormMensualidad;
