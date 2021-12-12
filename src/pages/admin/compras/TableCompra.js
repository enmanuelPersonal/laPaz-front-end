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
import { DeleteForever } from '@material-ui/icons';

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

const TableCompra = ({
  productBodySelect,
  setProductBodySelect,
  setGetTotal,
  setGetSubTotal,
  getItebisId,
}) => {
  const classes = useStyles();
  const [idDeleteProducto, setIdDeleteProducto] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    let getPorciento = getItebisId ? parseFloat(getItebisId) : 0.18;
    let gTotal = 0.0;
    let gSubTotal = 0.0;

    productBodySelect.forEach(({ precio, cantidad }) => {
      gSubTotal += cantidad * precio;
    });

    gTotal = gSubTotal + gSubTotal * getPorciento;

    setGetSubTotal(gSubTotal);
    setGetTotal(gTotal);

    // eslint-disable-next-line
  }, [productBodySelect, getItebisId]);

  const handleDelete = () => {
    const getProductos = productBodySelect.filter(
      (v, i) => i !== idDeleteProducto
    );
    setProductBodySelect(getProductos);
    setOpenDialog(false);
  };

  return (
    <div>
      <Paper display="flex" justifyContent="center">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head} align="center">
                  Nombre
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Precio
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Cantidad
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productBodySelect.length ? (
                productBodySelect.map((producto, index) => {
                  const { nombre, cantidad, precio } = producto;

                  return (
                    <TableRow
                      hover
                      key={`${nombre} - ${index}`}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: '#fff' }
                          : { backgroundColor: '#ECECEC' }
                      }
                    >
                      <TableCell align="center">{nombre}</TableCell>
                      <TableCell align="center">{Number.parseFloat(precio).toFixed(2)}</TableCell>
                      <TableCell align="center">{cantidad}</TableCell>
                      <TableCell align="center">
                        <DeleteForever
                          onClick={() => {
                            setIdDeleteProducto(index);
                            setOpenDialog(true);
                          }}
                        />{' '}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow></TableRow>
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

export default TableCompra;
