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
  // Slide,
} from '@material-ui/core';
import { formatDate } from '../../../helpers/formatDate';
import { get } from '../../../helpers/fetch';

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

const TableDifuntos = ({ openPopup }) => {
  const classes = useStyles();
  const [difunto, setDifunto] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  // const [idDeletedifunto, setIdDeletedifunto] = useState('');

  useEffect(() => {
    get('deceased')
      .then((res) => res.json())
      .then(({ data }) => {
        setDifunto(data || []);
      });
    // eslint-disable-next-line
  }, [openPopup, openDialog]);

  // const handleUpdate = (difunto) => {
  //   setEdit(true);
  //   setBody(difunto);
  //   setOpenPopup(true);
  // };

  // const handleDelete = () => {
  //   const { idEntidad } = idDeletedifunto;

  //   return remove('difunto', { idEntidad })
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
                  Nombre
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Propietario Suscripción
                </TableCell>
                <TableCell className={classes.head} align="center">
                  Fecha Defunción
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {difunto.length ? (
                difunto.map((difunto, index) => {
                  const {
                    nombre,
                    apellido,
                    updatedAt,
                    nombreCliente,
                    appellidoCliente,
                  } = difunto;
                  return (
                    <TableRow
                      hover
                      key={`${updatedAt} - ${index}`}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: '#fff' }
                          : { backgroundColor: '#ECECEC' }
                      }
                    >
                      <TableCell align="center">{`${nombre} ${apellido}`}</TableCell>
                      <TableCell align="center">{`${nombreCliente} ${appellidoCliente}`}</TableCell>
                      <TableCell align="center">
                        {formatDate(updatedAt)}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className={classes.emptyRow}>
                  <TableCell align="center" colSpan="2">
                    <span className={classes.tableLabel}>
                      No hay difuntos registrados
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

export default TableDifuntos;
