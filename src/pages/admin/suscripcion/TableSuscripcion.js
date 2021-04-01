import React, { useState, useEffect, forwardRef } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import { DeleteForever, Edit } from '@material-ui/icons';
import { get, remove } from '../../../helpers/fetch';
import { formatDate } from '../../../helpers/formatDate';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: '-108px',
    minWidth: '92%',
    margin: 'auto',
    height: '500px',
    display: 'block',
    textAlign: 'center',
    justifyContent: 'center',
    '& > div:first-child': {
      '&::before': {
        position: 'absolute',
        top: '-60px',
        left: '0',
        color: '#00205C',
        'font-size': '20px',
        'font-family': 'Montserrat',
        'font-weight': 'bold',
      },
    },
    [theme.breakpoints.down(400)]: {
      bottom: '1em',
      height: '55vh',
    },
    [theme.breakpoints.down(700)]: {
      top: '0',
      left: '0',
      right: '0',
    },
    [theme.breakpoints.down(1400)]: {
      top: '200px',
      left: '0',
      right: '0',
    },
    [theme.breakpoints.up(1400)]: {
      top: '340px',
      left: '0',
      right: '0',
    },
    [theme.breakpoints.down(1300)]: {
      marginLeft: 250,
    },
  },
  emptyRow: {
    height: '200px',
  },
  tableLabel: {
    color: '#630F5C',
    fontSize: '16px',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
  },
  head: {
    fontWeight: 'bold',
    color: '#630F5C',
    backgroundColor: '#E6C3E2',
  },
  button: {},
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TableSuscripcion = ({ setEdit, setBody, setOpenPopup, openPopup }) => {
  const classes = useStyles();
  const [suscripcion, setSuscripcion] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [idDeleteSuscripcion, setIdDeleteSuscripcion] = useState('');

  useEffect(() => {
    get('suscripcion')
      .then((res) => res.json())
      .then(({ data }) => {
        setSuscripcion(data || []);
      });
  }, [openPopup, openDialog]);

  const handleUpdate = (suscripcion) => {
    setEdit(true);
    setBody(suscripcion);
    setOpenPopup(true);
  };

  const handleDelete = () => {
    const { idSuscripcion } = idDeleteSuscripcion;

    return remove('suscripcion', { idSuscripcion })
      .then((res) => res.json())
      .then(({ data }) => {
        if (data[0] === 1) {
        }
      })
      .catch((err) => alert(err.message))
      .finally(() => setOpenDialog(false));
  };

  return (
    <div>
      <Paper display="flex" justifyContent="center">
        <TableContainer>
          <Table>
            {suscripcion.length > 0 ? (
              <TableHead>
                <TableRow>
                  <TableCell className={classes.head} align="center">
                    Cliente
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Identidad Cliente
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Estado Suscripcion
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Plan
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Monto
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Cuotas
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Fecha
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
            ) : null}
            <TableBody>
              {suscripcion.length ? (
                suscripcion.map((suscripcion, index) => {
                  const {
                    monto,
                    statusSuscripcion,
                    fecha,
                    tipoPlan,
                    cuotas,
                    nombre,
                    apellido,
                    identidades: { identidad },
                  } = suscripcion;
                  return (
                    <TableRow
                      hover
                      key={`${identidad} - ${index}`}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: '#fff' }
                          : { backgroundColor: '#BCBFBC' }
                      }
                    >
                      <TableCell align="center">{`${nombre} ${apellido}`}</TableCell>
                      <TableCell align="center">{identidad}</TableCell>
                      <TableCell align="center">{statusSuscripcion}</TableCell>
                      <TableCell align="center">{tipoPlan}</TableCell>
                      <TableCell align="center">{monto}</TableCell>
                      <TableCell align="center">{cuotas}</TableCell>
                      <TableCell align="center">{formatDate(fecha)}</TableCell>
                      <TableCell align="center">
                        <Edit onClick={() => handleUpdate(suscripcion)} />{' '}
                        <DeleteForever
                          onClick={() => {
                            setIdDeleteSuscripcion(suscripcion);
                            setOpenDialog(true);
                          }}
                        />{' '}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className={classes.emptyRow}>
                  <TableCell align="center" colSpan="2">
                    <span className={classes.tableLabel}>
                      No hay suscripcions registrados
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Eliminar Registro
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Esta seguro que desea eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDelete()}
          >
            Aceptar
          </Button>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TableSuscripcion;
