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
import Popup from '../../../components/Popup';
import TableSelectCliente from '../clientes/TableSelectClient';
import { drawerWidth } from '../../../utils/consts';
import TableSelectParientes from '../parientes/TableSelectParientes';
import { DialogSlide } from '../../../components/alert/DialogSlide';
import { uploadImagen } from '../../../helpers/uploadImagen';
import { post } from '../../../helpers/fetch';

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

const initialCliente = {
  nombre: '',
  apellido: '',
};

const FormDifuntos = ({ edit = false, body = {}, setOpenPopup }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [isDifuntoSuccess, setIsDifuntoSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [openPopupSelecctCliente, setOpenPopupSelecctCliente] = useState(false);
  const [openPopupParientes, setOpenPopupParientes] = useState(false);

  const [clienteId, setClienteId] = useState('');
  const [clientePersonId, setClientePersonId] = useState('');
  const [clienteName, setClienteName] = useState(initialCliente);
  const [parientes, setParientes] = useState([]);
  const [uploadImg, setUploadImg] = useState('');

  const { nombre, apellido } = clienteName;

  const cleanForm = () => {
    setSelectedDate(Date.now());
    setClienteId('');
    setClientePersonId('');
    setClienteName(initialCliente);
    setParientes([]);
    setUploadImg('');
  };

  const handleClose = () => {
    setOpenDialog(false);
    setErrorServer(false);
    if (isDifuntoSuccess) {
      setOpenPopup(false);
      setIsDifuntoSuccess(false);
    }
  };

  const onChangeImagen = ({ target: { files } }) => {
    setUploadImg(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await uploadImagen(uploadImg);

    const userData = {};

    let difuntoPerson = clientePersonId;

    if (parientes.length) {
      difuntoPerson = parientes[0].idPersona;
    }

    Object.assign(
      userData,
      { idCliente: clienteId },
      { idPersona: difuntoPerson },
      { urlActa: url }
    );

    return post('deceased/add', userData)
      .then(async (response) => {
        if (response.status === 201) {
          setErrorServer(false);
          setIsDifuntoSuccess(true);
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
    <Form style={{ width: 800 }} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                name="cliente"
                label={'Cliente'}
                value={`${nombre || ''} ${apellido || ''}`}
                disabled={true}
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
                  onClick={() => setOpenPopupSelecctCliente(true)}
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
              value={
                parientes.length
                  ? `${parientes[0].nombre} ${parientes[0].apellido}`
                  : ''
              }
              disabled={true}
              style={{ maxWidth: 200 }}
            />
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
                  onClick={() => setOpenPopupParientes(true)}
                  disabled={!clienteId}
                >
                  <Search />
                </Button>
              </Box>
            </Grid>
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
              // src={`${REACT_APP_API_URL}/uploads/${url}`}
              alt="Acta Defunción"
            />
          </Box>
          <input
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={onChangeImagen}
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
            isDifunto={true}
            setClientePersonId={setClientePersonId}
          />
        </Popup>
        <Popup
          title={'Seleccionar Difuntos'}
          openPopup={openPopupParientes}
          setOpenPopup={setOpenPopupParientes}
        >
          <TableSelectParientes
            setParientesIds={setParientes}
            parientesIds={parientes}
            idCliente={clienteId}
            setOpen={setOpenPopupParientes}
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

export default FormDifuntos;
