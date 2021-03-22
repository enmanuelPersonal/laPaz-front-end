import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  makeStyles,
  DialogActions as MuiDialogActions,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { get } from '../helpers/fetch';

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

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

export const Cargos = ({ setOpen, open, setGetCargos, getCargo }) => {
  const classes = useStyles();
  const [dataCargo, setDataCargo] = useState([]);
  const [idCargos, setIdCargos] = useState({});

  useEffect(() => {
    const fetchTypeIdentity = async () => {
      await get('cargo')
        .then((res) => res.json())
        .then(({ data }) => {
          const parseData = {};
          data.forEach(({ cargo }) =>
            Object.assign(parseData, { [cargo]: false })
          );
          const resData = data.map(({ cargo }) => {
            return {
              cargo,
            };
          });
          if (getCargo.length) {
            const res = getCargo.map((cargo) => {
              Object.assign(parseData, { [cargo]: true });
              return {
                cargo,
              };
            });
            Object.assign(res, { ...resData });
            setIdCargos(parseData);
            setDataCargo(res);
          } else {
            setIdCargos(parseData);
            setDataCargo(resData);
          }
        })
        .catch(() => {});
    };

    fetchTypeIdentity();
    // eslint-disable-next-line
  }, []);

  const handleSave = () => {
    const cargos = [];
    Object.entries(idCargos).forEach(([cargo, value]) => {
      if (value) {
        cargos.push(cargo);
      }
    });

    setGetCargos(cargos);
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
          Seleccionar Cargos
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormGroup>
                {console.log('object==== ', dataCargo)}
                {dataCargo.map(({ cargo }, i) => (
                  <FormControlLabel
                    key={`${cargo}/${i}`}
                    control={
                      <Checkbox
                        checked={idCargos[cargo]}
                        onChange={({ target: { name, checked } }) =>
                          setIdCargos({ ...idCargos, [name]: checked })
                        }
                        name={cargo}
                      />
                    }
                    label={cargo}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave} color="primary">
            Guardar Cargos
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
