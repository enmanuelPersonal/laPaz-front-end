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

const TableUsuario = ({ setEdit, setBody, setOpenPopup, openPopup }) => {
  const classes = useStyles();
  const [usuarios, setUsuarios] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [idDeleteUsuario, setIdDeleteUsuario] = useState('');

  useEffect(() => {
    get('user')
      .then((res) => res.json())
      .then(({ data }) => {
        setUsuarios(data || []);
      });
  }, [openPopup, openDialog]);

  const handleUpdate = (usuario) => {
    setEdit(true);
    setBody(usuario);
    setOpenPopup(true);
  };

  const handleDelete = () => {
    const { idUsuario } = idDeleteUsuario;

    return remove('user', { idUsuario })
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
            {usuarios.length > 0 ? (
              <TableHead>
                <TableRow>
                  <TableCell className={classes.head} align="center">
                    Nombre
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Nombre Usuario
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Teléfono
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Tipo
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Fecha de nacimiento
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
            ) : null}
            <TableBody>
              {usuarios.length ? (
                usuarios.map((user, index) => {
                  const { nombre, usuario, tipo, nacimiento, telefonos } = user;
                  return (
                    <TableRow
                      hover
                      key={index + `${usuario}`}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: '#fff' }
                          : { backgroundColor: '#BCBFBC' }
                      }
                    >
                      <TableCell align="center">{nombre}</TableCell>
                      <TableCell align="center">{usuario}</TableCell>
                      <TableCell align="center">
                        {telefonos.length ? telefonos[0].telefono : ''}
                      </TableCell>
                      <TableCell align="center">{tipo}</TableCell>
                      <TableCell align="center">
                        {formatDate(nacimiento)}
                      </TableCell>
                      <TableCell align="center">
                        <Edit onClick={() => handleUpdate(user)} />{' '}
                        <DeleteForever
                          onClick={() => {
                            setIdDeleteUsuario(user);
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
                      No hay Usuarios registrados
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
            Está seguro que desea eliminar este registro?
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

export default TableUsuario;
