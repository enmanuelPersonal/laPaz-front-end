import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
  Box,
  // makeStyles,
  TextField,
  DialogActions as MuiDialogActions,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ActionButton from './controls/ActionButton';

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
  select: {
    marginLeft: theme.spacing(1),
  },
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 226,
  },
  btnClose: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
}));

const DialogTitle = withStyles(styles)(
  ({ children, classes, onClose, ...other }) => {
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <Button
            color="secondary"
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
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

const paisItems = [
  { id: 'República Dominicana', tipo: 'República Dominicana' },
];

const regionItems = [
  { id: 'Norte', tipo: 'Norte' },
  { id: 'Sur', tipo: 'Sur' },
  { id: 'Este', tipo: 'Este' },
];

const ciudadItems = [{ id: 'Santiago', tipo: 'Santiago' }];

const municipioItems = [{ id: 'Punal', tipo: 'Punal' }];
const sectorItems = [{ id: 'Laguna Prieta', tipo: 'Laguna Prieta' }];
const calleItems = [
  { id: 'Los estrellas', tipo: 'Los estrellas' },
  { id: 'Los filpos', tipo: 'Los filpos' },
];

export const Direccion = ({ setOpen, open, setGetDireccion, getDireccion }) => {
  const classes = useStyles();
  const [getPais, setGetPais] = useState('');
  const [getRegion, setGetRegion] = useState('');
  const [getCiudad, setGetCiudad] = useState('');
  const [getMunicipio, setGetMunicipio] = useState('');
  const [getSector, setGetSector] = useState('');
  const [getCalle, setGetCalle] = useState('');
  const [getCasa, setGetCasa] = useState('');
  const [getReferencia, setGetReferencia] = useState('');

  useEffect(() => {
    if (getDireccion.length) {
      const {
        pais,
        region,
        ciudad,
        municipio,
        sector,
        calle,
        casa,
        referencia,
      } = getDireccion[0];
      setGetPais(pais);
      setGetRegion(region);
      setGetCiudad(ciudad);
      setGetMunicipio(municipio);
      setGetSector(sector);
      setGetCalle(calle);
      setGetCasa(casa);
      setGetReferencia(referencia);
    }
    // eslint-disable-next-line
  }, []);

  const handleSave = () => {
    const direcciones = {};
    Object.assign(
      direcciones,
      { pais: getPais },
      { region: getRegion },
      { ciudad: getCiudad },
      { municipio: getMunicipio },
      { sector: getSector },
      { calle: getCalle },
      { casa: getCasa },
      { referencia: getReferencia }
    );

    setGetDireccion([direcciones]);
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Dialog
        className={classes.dialogContent}
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => setOpen(false)}
        >
          Registro de Dirección
        </DialogTitle>
        <DialogContent dividers style={{ overflow: 'hidden' }}>
          <Grid container spacing={2} style={{ marginLeft: 16 }}>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Pais</InputLabel>
                <Select
                  label="Pais"
                  name="pais"
                  value={getPais}
                  onChange={({ target: { value } }) => setGetPais(value)}
                >
                  <MenuItem disabled value="">
                    Seleccione su Pais
                  </MenuItem>
                  {paisItems.map(({ id, tipo }) => (
                    <MenuItem key={id} value={id}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Region</InputLabel>
                <Select
                  label="Region"
                  name="region"
                  value={getRegion}
                  onChange={({ target: { value } }) => setGetRegion(value)}
                >
                  <MenuItem disabled value="">
                    Seleccione su Region
                  </MenuItem>
                  {regionItems.map(({ id, tipo }) => (
                    <MenuItem key={id} value={id}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Ciudad</InputLabel>
                <Select
                  label="Ciudad"
                  name="ciudad"
                  value={getCiudad}
                  onChange={({ target: { value } }) => setGetCiudad(value)}
                >
                  <MenuItem disabled value="">
                    Seleccione su Ciudad
                  </MenuItem>
                  {ciudadItems.map(({ id, tipo }) => (
                    <MenuItem key={id} value={id}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={6} className={classes.formControl}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Municipio</InputLabel>
                <Select
                  label="Municipio"
                  name="municipio"
                  value={getMunicipio}
                  onChange={({ target: { value } }) => setGetMunicipio(value)}
                >
                  <MenuItem disabled value="">
                    Seleccione su Municipio
                  </MenuItem>
                  {municipioItems.map(({ id, tipo }) => (
                    <MenuItem key={id} value={id}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Sector</InputLabel>
                <Select
                  label="Sector"
                  name="sector"
                  value={getSector}
                  onChange={({ target: { value } }) => setGetSector(value)}
                >
                  <MenuItem disabled value="">
                    Seleccione su Sector
                  </MenuItem>
                  {sectorItems.map(({ id, tipo }) => (
                    <MenuItem key={id} value={id}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Calle</InputLabel>
                <Select
                  label="Calle"
                  name="calle"
                  value={getCalle}
                  onChange={({ target: { value } }) => setGetCalle(value)}
                >
                  <MenuItem disabled value="">
                    Seleccione su Calle
                  </MenuItem>
                  {calleItems.map(({ id, tipo }) => (
                    <MenuItem key={id} value={id}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={6}>
              <TextField
                variant="outlined"
                name="casa"
                label="Num. casa"
                value={getCasa}
                onChange={({ target: { value } }) => setGetCasa(value)}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                variant="outlined"
                name="referencia"
                label="Referencia"
                value={getReferencia}
                onChange={({ target: { value } }) => setGetReferencia(value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            onClick={handleSave}
            color="primary"
          >
            GUARDAR
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
