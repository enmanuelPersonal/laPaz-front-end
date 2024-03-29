import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  // Button,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogContentText,
  // DialogTitle,
  // Slide,
} from '@material-ui/core';
// import { DeleteForever, Edit } from '@material-ui/icons';
import { get } from '../../../helpers/fetch';
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

// const Transition = forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const TableMensualidad = ({ setEdit, setBody, setOpenPopup, openPopup }) => {
  const classes = useStyles();
  const [mensualidad, setMensualidad] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  // const [idDeleteMensualidad, setIdDeleteMensualidad] = useState('');

  useEffect(() => {
    get('mensualidad')
      .then((res) => res.json())
      .then(({ data }) => {
        setMensualidad(data || []);
      });
    // eslint-disable-next-line
  }, [openPopup, openDialog]);

  // const handleUpdate = (mensualidad) => {
  //   setEdit(true);
  //   setBody(mensualidad);
  //   setOpenPopup(true);
  // };

  // const handleDelete = () => {
  //   const { idEntidad } = idDeleteMensualidad;

  //   return remove('mensualidad', { idEntidad })
  //     .then((res) => res.json())
  //     .then(({ data }) => {
  //       if (data[0] === 1) {
  //       }
  //     })
  //     .catch((err) => alert(err.message))
  //     .finally(() => setOpenDialog(false));
  // };

  return (
    <div>
      <Paper display="flex" justifyContent="center">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head} align="center">
                  Cliente Num. Documento
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Cantidad Meses
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Monto
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Tipo Pago
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Fecha
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {mensualidad.length ? (
                mensualidad.map((mensualidad, index) => {
                  const {
                    identidad: { seri },
                    monto,
                    meses,
                    fecha,
                    tipoPago,
                  } = mensualidad;
                  return (
                    <TableRow
                      hover
                      key={`${seri} - ${index}`}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: '#fff' }
                          : { backgroundColor: '#ECECEC' }
                      }
                    >
                      <TableCell align="center">{seri}</TableCell>
                      <TableCell align="center">{meses}</TableCell>
                      <TableCell align="center">{monto}</TableCell>
                      <TableCell align="center">{tipoPago}</TableCell>
                      <TableCell align="center">{formatDate(fecha)}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className={classes.emptyRow}>
                  <TableCell align="center" colSpan="2">
                    <span className={classes.tableLabel}>
                      No hay mensualidads registrados
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TableMensualidad;
