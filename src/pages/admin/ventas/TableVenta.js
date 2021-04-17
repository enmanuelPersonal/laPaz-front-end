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
} from '@material-ui/core';
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


const TableVenta = () => {
  const classes = useStyles();
  // const [openDialog, setOpenDialog] = useState(false);
  // const [idDeleteEmploye, setIdDeleteEmploye] = useState('');

  // useEffect(() => {
  //   get('employe')
  //     .then((res) => res.json())
  //     .then(({ data }) => {
  //       setEmployes(data || []);
  //     });
  // }, [openPopup, openDialog]);

  // const handleUpdate = (employe) => {
  //   setEdit(true);
  //   setBody(employe);
  //   setOpenPopup(true);
  // };

  const handleDelete = () => {
    // const { idEntidad } = idDeleteEmploye;
    // return remove('employe', { idEntidad })
    //   .then((res) => res.json())
    //   .then(({ data }) => {
    //     if (data[0] === 1) {
    //     }
    //   })
    //   .catch((err) => alert(err.message))
    //   .finally(() => setOpenDialog(false));
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
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell align="center">10.00</TableCell>
                <TableCell align="center">5.00</TableCell>
                <TableCell align="center">1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TableVenta;
