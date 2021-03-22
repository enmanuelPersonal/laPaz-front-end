import React, { useState, useEffect } from 'react';
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
  // makeStyles,
  TextField,
  DialogActions as MuiDialogActions,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   formControl: {
//     margin: theme.spacing(3),
//   },
// }));

const DialogTitle = withStyles(styles)(
  ({ children, classes, onClose, ...other }) => {
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
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
    margin: 0,
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
  // const classes = useStyles();
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
          Registro de Direccion
        </DialogTitle>
        <DialogContent dividers>
          <FormControl variant="outlined">
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

          <FormControl variant="outlined">
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

          <FormControl variant="outlined">
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

          <FormControl variant="outlined">
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

          <FormControl variant="outlined">
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

          <FormControl variant="outlined">
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
          <TextField
            variant="outlined"
            name="casa"
            label="Num. casa"
            value={getCasa}
            onChange={({ target: { value } }) => setGetCasa(value)}
          />
          <TextField
            variant="outlined"
            name="referencia"
            label="Referencia"
            value={getReferencia}
            onChange={({ target: { value } }) => setGetReferencia(value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary">
            Guardar Direccion
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
