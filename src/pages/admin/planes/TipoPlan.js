import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  Typography,
  FormControl,
  Grid,
  TextField,
  DialogActions as MuiDialogActions,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { get, post } from '../../../helpers/fetch';
import { DialogSlide } from '../../../components/alert/DialogSlide';

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
    width: 270,
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 10,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const initialState = {
  tipo: '',
};

export const FormTipoPlan = ({ setOpen, open }) => {
  const classes = useStyles();
  const [typeUserData, setTypeUserData] = useState(initialState);
  const [getPermisos, setGetPermisos] = useState([]);
  const [permisosSelect, setPermisosSelect] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [isTypeUserSuccess, setIsTypeUserSuccess] = useState(false);

  const { tipo } = typeUserData;

  useEffect(() => {
    const fetchGetPermisos = async () => {
      await get('permisos')
        .then((res) => res.json())
        .then(({ data }) => setGetPermisos(data))
        .catch(() => {});
    };

    if (getPermisos && !getPermisos.length) fetchGetPermisos();
    // eslint-disable-next-line
  }, []);

  const handleChange = ({ value, name }) => {
    setTypeUserData({ ...typeUserData, [name]: value });
  };

  const handleSelect = ({ target: { name, checked } }) => {
    if (checked) {
      setPermisosSelect([...permisosSelect, name]);
    } else {
      const newPermisos = permisosSelect.filter((value) => value !== name);
      setPermisosSelect(newPermisos);
    }
  };

  const cleanForm = () => {
    setTypeUserData(initialState);
    setPermisosSelect([]);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setErrorServer(false);
    if (isTypeUserSuccess) {
      setOpen(false);
      setIsTypeUserSuccess(false);
    }
  };

  const handleSave = () => {
    Object.assign(typeUserData, { permisos: permisosSelect });

    return post('userType/add', typeUserData)
      .then(async (response) => {
        if (response.status === 201) {
          setErrorServer(false);
          setIsTypeUserSuccess(true);
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
          Registrar Tipo de Plan
        </DialogTitle>
        <DialogContent dividers style={{ overflow: 'hidden' }}>
          <Grid container spacing={2} style={{ marginLeft: 16 }}>
            <Grid item xs={10}>
              <TextField
                className={classes.textField}
                variant="outlined"
                name="nombre"
                label="Nombre"
                type="text"
                value={tipo}
                onChange={({ target: { value, name } }) =>
                  handleChange({ value, name })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                className={classes.textField}
                variant="outlined"
                name="monto"
                label="Monto"
                type="text"
                value={tipo}
                onChange={({ target: { value, name } }) =>
                  handleChange({ value, name })
                }
                fullWidth
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
    </React.Fragment>
  );
};
