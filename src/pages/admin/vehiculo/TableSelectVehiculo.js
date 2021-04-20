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
  Checkbox,
  Button,
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
  button: {
    marginTop: 20,
  },
}));

const TableSelectVehiculo = ({ setVehiculoId, vehiculoId, setOpen }) => {
  const classes = useStyles();
  const [vehiculo, setVehiculo] = useState([]);
  const [vehiculoSelect, setVehiculoSelect] = useState('');

  useEffect(() => {
    get('vehiculo')
      .then((res) => res.json())
      .then(({ data }) => {
        const parseData = data.map((data) => {
          let checked = false;
          const { idVehiculo } = data;
          if (idVehiculo === vehiculoId) {
            checked = true;
          }

          return {
            ...data,
            checked,
          };
        });
        setVehiculo(parseData || []);
      });

    // eslint-disable-next-line
  }, []);

  const handleSelect = (idVehiculoGet) => {
    const parseData = vehiculo.map((data) => {
      const { idVehiculo, checked } = data;

      if (idVehiculo === idVehiculoGet) {
        setVehiculoSelect(!checked ? idVehiculoGet : '');
        return {
          ...data,
          checked: !checked,
        };
      } else {
        return {
          ...data,
          checked: false,
        };
      }
    });
    setVehiculo(parseData || []);
  };

  const handleSave = () => {
    setVehiculoId(vehiculoSelect);
    setOpen(false);
  };

  return (
    <div>
      <Paper display="flex" justifyContent="center">
        <TableContainer>
          <Table>
            {vehiculo.length > 0 ? (
              <TableHead>
                <TableRow>
                  <TableCell className={classes.head} align="center">
                    Marca
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Modelo
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Estado
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
            ) : null}
            <TableBody>
              {vehiculo.length ? (
                vehiculo.map((vehiculoTable, index) => {
                  const {
                    idVehiculo,
                    status,
                    marca,
                    modelo,
                    checked,
                  } = vehiculoTable;
                  return (
                    <TableRow
                      hover
                      key={idVehiculo}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: '#fff' }
                          : { backgroundColor: '#ECECEC' }
                      }
                    >
                      <TableCell align="center">{marca}</TableCell>
                      <TableCell align="center">{modelo}</TableCell>
                      <TableCell align="center">{`${
                        status ? 'Disponible' : 'Ocupado'
                      }`}</TableCell>
                      <TableCell align="center">
                        <Checkbox
                          name={idVehiculo}
                          checked={checked}
                          onChange={() => handleSelect(idVehiculo)}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className={classes.emptyRow}>
                  <TableCell align="center" colSpan="2">
                    <span className={classes.tableLabel}>
                      No hay vehiculos registrados
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Button
        className={classes.button}
        variant="contained"
        autoFocus
        onClick={handleSave}
        color="primary"
      >
        GUARDAR
      </Button>
    </div>
  );
};

export default TableSelectVehiculo;
