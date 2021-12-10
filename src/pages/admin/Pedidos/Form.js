import React, { useState, useEffect, useContext, forwardRef } from "react";
import {
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@material-ui/core";

import { DialogSlide } from "../../../components/alert/DialogSlide";

import Form from "../../../components/Form";
import { get, post, put } from "../../../helpers/fetch";
import AppContext from "../../../auth/AuthContext";
import { formatDate } from "../../../helpers/formatDate";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
    textTransform: "none",
  },
  textField: {
    width: "20ch",
  },
  divider: {
    marginBottom: 5,
    marginTop: 5,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const stados = ["Completado", "Proceso"];

const FormPedidos = ({ body, setOpenDialogForm }) => {
  const classes = useStyles();
  const {
    state: {
      userData: { idUsuario },
    },
  } = useContext(AppContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [getStado, setGetStado] = useState("Proceso");

  const {
    nombre,
    apellido,
    total,
    status,
    createdAt,
    fechaEntrega,
    idSuplidor,
    detalle,
    numPedido,
  } = body;

  useEffect(() => {
    setGetStado(status);
    setOpenDialogForm(false);
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
    setErrorSubmit(false);
    setOpenDialogForm(true);
  };

  const handleSubmit = async () => {
    return put("pedido", {
      numPedido,
      idSuplidor,
      detalle,
      total,
      status: getStado,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if (data[0] === 1) {
          setErrorSubmit(false);
        }
      })
      .catch((err) => setErrorSubmit(err.message))
      .finally(() => {
        setOpenDialogConfirm(false);
        setOpenDialog(true);
      });
  };

  return (
    <Form>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h6">Creado: {formatDate(createdAt)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            Entregado:{" "}
            {fechaEntrega ? formatDate(fechaEntrega) : "No Entregado"}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="outlined"
            name="suplidor"
            label="Suplidor"
            type="text"
            value={`${nombre} ${apellido}`}
            disabled={true}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant="outlined"
            name="monto"
            label="Monto"
            type="text"
            value={total}
            disabled={true}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl variant="outlined">
            <InputLabel>Estado Pedido</InputLabel>
            <Select
              label="Estado Pedido"
              name="stado"
              value={getStado}
              onChange={({ target: { value } }) => setGetStado(value)}
            >
              <MenuItem disabled value="">
                Seleccione el estado del pedido
              </MenuItem>
              <MenuItem disabled value="Cancelado">
              Cancelado
              </MenuItem>
              {stados.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <div style={{ marginTop: 0 }}>
            <Button
              onClick={() => setOpenDialogConfirm(true)}
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
            >
              ACTUALIZAR
            </Button>
          </div>
        </Grid>
        <Dialog
          open={openDialogConfirm}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpenDialogConfirm(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Actualizar Pedido
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Está seguro que desea actualizar este pedido?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Aceptar
            </Button>
            <Button onClick={() => setOpenDialogConfirm(false)}>
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
        {openDialog && (
          <DialogSlide
            handleClose={handleClose}
            openDialog={openDialog}
            title={
              !errorSubmit
                ? "Datos Actualizados!"
                : "La Actualizacion no se pudo completar"
            }
            body={
              !errorSubmit
                ? "Su Actualizacion se ha completado correctamente."
                : `La  actualizacion no se pudo completar. ${errorSubmit} `
            }
          />
        )}
      </Grid>
    </Form>
  );
};

export default FormPedidos;
