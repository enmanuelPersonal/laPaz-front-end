import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  Typography,
  Grid,
  TextField,
  DialogActions as MuiDialogActions,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { post } from '../../../helpers/fetch';
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
  monto: '',
};

export const FormTipoPlan = ({ setOpen, open }) => {
  const classes = useStyles();
  const [typePlanData, setTypePlanData] = useState(initialState);

  const [openDialog, setOpenDialog] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [isTypePlanSuccess, setIsTypePlanSuccess] = useState(false);

  const { tipo, monto } = typePlanData;

  const handleChange = ({ value, name }) => {
    setTypePlanData({ ...typePlanData, [name]: value });
  };

  const cleanForm = () => {
    setTypePlanData(initialState);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setErrorServer(false);
    if (isTypePlanSuccess) {
      setOpen(false);
      setIsTypePlanSuccess(false);
    }
  };

  const handleSave = () => {
    Object.assign(typePlanData, { monto: parseFloat(monto) });

    return post('typePlan/add', typePlanData)
      .then(async (response) => {
        if (response.status === 201) {
          setErrorServer(false);
          setIsTypePlanSuccess(true);
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
                name="tipo"
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
                type="number"
                value={monto}
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
