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
  button: {
    marginTop: 20,
  },
}));

const TableSelectSuplidor = ({
  setSuplidorId,
  suplidorId,
  setOpen,
  getSuplidorSelect,
  setSuplidorEntidadId,
}) => {
  const classes = useStyles();
  const [suplidor, setSuplidor] = useState([]);
  const [SuplidorSelect, setSuplidorSelect] = useState('');
  const [getDataSuplidorSelect, setGetDataSuplidorSelect] = useState({});

  useEffect(() => {
    get('client')
      .then((res) => res.json())
      .then(({ data }) => {
        const parseData = data.map((data) => {
          let checked = false;
          const { idSuplidor } = data;
          if (idSuplidor === suplidorId) {
            checked = true;
          }

          return {
            ...data,
            checked,
          };
        });
        setSuplidor(parseData || []);
      });

    // eslint-disable-next-line
  }, []);

  const handleSelect = (idSuplido) => {
    const parseData = suplidor.map((data) => {
      const {
        idSuplidor,
        checked,
      } = data;

      if (idSuplidor === idSuplido) {
        setSuplidorSelect(!checked ? idSuplido : '');
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
    setSuplidor(parseData || []);
  };

  const handleSave = () => {
    setSuplidorId(SuplidorSelect);
    setOpen(false);
  };

  return (
    <div>
      <Paper display="flex" justifyContent="center">
        <TableContainer>
          <Table>
            {suplidor.length > 0 ? (
              <TableHead>
                <TableRow>
                  <TableCell className={classes.head} align="center">
                    Nombres
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Apellidos
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Sexo
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Identidad
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Nacimiento
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
            ) : null}
            <TableBody>
              {suplidor.length ? (
                suplidor.map((client, index) => {
                  const {
                    idSuplidor,
                    nombre,
                    apellido,
                    nacimiento,
                    sexo,
                    identidades: { serie },
                    checked,
                  } = client;
                  return (
                    <TableRow
                      hover
                      key={serie + index}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: '#fff' }
                          : { backgroundColor: '#BCBFBC' }
                      }
                    >
                      <TableCell align="center">{nombre}</TableCell>
                      <TableCell align="center">{apellido}</TableCell>
                      <TableCell align="center">{sexo}</TableCell>
                      <TableCell align="center">{serie}</TableCell>
                      <TableCell align="center">
                        {formatDate(nacimiento)}
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          name={idSuplidor}
                          checked={checked}
                          onChange={() => handleSelect(idSuplidor)}
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
                      No hay Suplidores registrados
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

export default TableSelectSuplidor;
