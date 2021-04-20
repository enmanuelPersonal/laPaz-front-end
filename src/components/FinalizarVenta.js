import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  Typography,
  makeStyles,
  DialogActions as MuiDialogActions,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  Container,
  Box,
  Grid,
  TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import TableSelectEmploye from '../pages/admin/employe/TableSelectEmploye';
import Popup from './Popup';
import TableSelectVehiculo from '../pages/admin/vehiculo/TableSelectVehiculo';
import { Search, CheckCircle } from '@material-ui/icons';
import { drawerWidth } from '../utils/consts';
import { Direccion } from './Direccion';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    minWidth: 0,
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.secondary.light,
  },
  secondary: {
    '& .MuiButton-label': {
      color: theme.palette.secondary.main,
    },
  },
  btn: {
    textTransform: 'none',
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(7),
  },
  dialog: {
    maxWidth: 330,
  },
}));

const DialogTitle = withStyles(styles)(
  ({ children, classes, onClose, ...other }) => {
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <Button
            aria-label="close"
            onClick={onClose}
            color="secondary"
            className={classes.closeButton}
          >
            <CloseIcon />
          </Button>
        ) : null}
      </MuiDialogTitle>
    );
  }
);

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 10,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const Transporte = ({
  setOpen,
  open,
  employeId,
  setEmployeId,
  vehiculoId,
  setVehiculoId,
  getDireccion,
  setGetDireccion,
  handleSave,
}) => {
  const classes = useStyles();
  const [openPopupEmploye, setOpenPopupEmploye] = useState(false);
  const [openPopupVehiculo, setOpenPopupVehiculo] = useState(false);
  const [openDireccion, setOpenDireccion] = useState(false);
  const [empleadoName, setEmpleadoName] = useState('');

  const handleSaveTransporte = () => {
    handleSave();
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => setOpen(false)}
        >
          Registro para el transporte
        </DialogTitle>
        <DialogContent dividers className={classes.dialog}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    variant="outlined"
                    name="empleado"
                    type="text"
                    size="small"
                    fullWidth
                    disabled={true}
                    label={empleadoName ? '' : 'Empleado'}
                    value={empleadoName}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      className={classes.btn}
                      style={
                        empleadoName
                          ? { backgroundColor: '#18AF18', color: '#fff' }
                          : { backgroundColor: '#939393', color: '#fff' }
                      }
                      aria-label="add"
                      component="span"
                      onClick={() => setOpenPopupEmploye(true)}
                    >
                      {' '}
                      {empleadoName ? <CheckCircle /> : <Search />}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <div>Vehiculo: </div>
                </Grid>
                <Grid item xs={2}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      className={classes.btn}
                      style={
                        vehiculoId
                          ? { backgroundColor: '#18AF18', color: '#fff' }
                          : { backgroundColor: '#939393', color: '#fff' }
                      }
                      aria-label="add"
                      component="span"
                      onClick={() => setOpenPopupVehiculo(true)}
                    >
                      {vehiculoId ? <CheckCircle /> : <Search />}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <div>Dirección: </div>
                </Grid>
                <Grid item xs={2}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      className={classes.btn}
                      variant="contained"
                      size="large"
                      onClick={() => setOpenDireccion(true)}
                      style={
                        getDireccion.length
                          ? { backgroundColor: '#18AF18', color: '#fff' }
                          : { backgroundColor: '#939393', color: '#fff' }
                      }
                      className={classes.button}
                    >
                      {getDireccion.length ? <CheckCircle /> : <Search />}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            onClick={handleSaveTransporte}
            color="primary"
          >
            GUARDAR
          </Button>
        </DialogActions>
      </Dialog>
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
            venta={true}
            setEmpleadoName={setEmpleadoName}
          />
        </Popup>
        <Popup
          title={'Seleccionar Vehiculo'}
          openPopup={openPopupVehiculo}
          setOpenPopup={setOpenPopupVehiculo}
        >
          <TableSelectVehiculo
            setVehiculoId={setVehiculoId}
            vehiculoId={vehiculoId}
            setOpen={setOpenPopupVehiculo}
          />
        </Popup>
      </Container>
      {openDireccion && (
        <Direccion
          setOpen={setOpenDireccion}
          open={openDireccion}
          setGetDireccion={setGetDireccion}
          getDireccion={getDireccion}
        />
      )}
    </div>
  );
};
