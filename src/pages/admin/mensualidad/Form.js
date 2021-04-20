import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  Box,
  Container,
} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Search } from '@material-ui/icons';

import Form from '../../../components/Form';
import { get, post } from '../../../helpers/fetch';
import { drawerWidth } from '../../../utils/consts';
import Popup from '../../../components/Popup';
import TableSelectCliente from '../clientes/TableSelectClient';
import { DialogSlide } from '../../../components/alert/DialogSlide';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
    textTransform: 'none',
  },
  textField: {
    width: '20ch',
  },
}));

const initialState = {
  nombre: '',
  apellido: '',
  cuotas: 0,
  idSuscripcion: '',
};

const initialCliente = {
  nombre: '',
  apellido: '',
};

const FormMensualidad = ({ edit = false, body = {}, setOpenPopup }) => {
  const classes = useStyles();
  const [openPopupSelecctCliente, setOpenPopupSelecctCliente] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [isMensualidadSuccess, setIsMensualidadSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [suscripcion, setSuscripcion] = useState(initialState);

  const [clienteId, setClienteId] = useState('');
  const [clienteName, setClienteName] = useState(initialCliente);
  const [monto, setMonto] = useState(0.0);
  const [meses, setMeses] = useState(1);

  const { nombre, apellido, cuotas, idSuscripcion } = suscripcion;

  useEffect(() => {
    const fetchSuscripcion = async () => {
      await get(`suscripcion/${clienteId}`)
        .then((res) => res.json())
        .then(({ data }) => {
          if (data) {
            setSuscripcion(data);
            setMonto(parseFloat(parseInt(meses) * data.cuotas));
          }
        })
        .catch(() => {});
    };

    if (clienteId) {
      fetchSuscripcion();
    }
    // eslint-disable-next-line
  }, [clienteId]);

  const cleanForm = () => {
    setSelectedDate(Date.now());
    setClienteId('');
  };

  const handleClose = () => {
    setOpenDialog(false);
    setErrorServer(false);
    if (isMensualidadSuccess) {
      setOpenPopup(false);
      setIsMensualidadSuccess(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {};

    Object.assign(userData, { idSuscripcion }, { meses }, { monto });

    return post('mensualidad/add', userData)
      .then(async (response) => {
        if (response.status === 201) {
          setErrorServer(false);
          setIsMensualidadSuccess(true);
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
  };

  return (
    <Form style={{ width: 600 }} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="cliente"
                type="text"
                style={{ maxWidth: 300 }}
                label={'Cliente'}
                value={`${nombre || ''} ${apellido || ''}`}
                disabled={true}
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
                  onClick={() => setOpenPopupSelecctCliente(true)}
                >
                  <Search />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            name="cantidad"
            label={'Cantidad Meses'}
            type="number"
            style={{ maxWidth: 150 }}
            value={meses}
            onChange={({ target: { value } }) => {
              if (parseInt(value) > 0) {
                setMeses(parseInt(value));
                setMonto(parseFloat(parseInt(value) * cuotas));
              }
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            name="monto"
            label={'Monto'}
            type="text"
            style={{ maxWidth: 180 }}
            value={monto}
          />
        </Grid>
        <Grid item xs={4}>
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
        </Grid>
        <div style={{ marginTop: 50, marginLeft: 12 }}>
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
      </Container>
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
    </Form>
  );
};

export default FormMensualidad;
