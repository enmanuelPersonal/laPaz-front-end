import React, { useEffect, useState } from 'react';
import {
  Search as SearchIcon,
  ViewList,
  Print,
  Visibility,
} from '@material-ui/icons';
import {
  Container,
  makeStyles,
  Box,
  Paper,
  Grid,
  Button,
  InputBase,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  TableCell,
} from '@material-ui/core';

import PageHeader from '../../../components/PageHeader';
import Popup from '../../../components/Popup';
import { drawerWidth } from '../../../utils/consts.js';
import { formatDate } from '../../../helpers/formatDate';
import { get } from '../../../helpers/fetch';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    textTransform: 'none',
    marginLeft: '15px',
  },
  input: {
    flex: 1,
  },
  rootSearch: {
    width: '60%',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    marginLeft: drawerWidth,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#ffff',
  },
  registerBtn: {
    marginLeft: '5px',
  },
  containerTable: {
    marginLeft: drawerWidth + 15,
    backgroundColor: '#fff',
    marginRight: 15,
    borderRadius: 10,
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
}));

const ReportVenta = () => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [venta, setVenta] = useState([]);
  const [getDetalle, setGetDetalle] = useState([]);

  useEffect(() => {
    get('venta')
      .then((res) => res.json())
      .then(({ data }) => {
        setVenta(data || []);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <PageHeader
        className={classes.root}
        title="Reporte de Ventas"
        subTitle="Consultar e Imprimir"
        icon={<ViewList fontSize="large" />}
      />
      <Box
        justifyContent="center"
        display="flex"
        className={classes.containerTable}
      >
        <Grid
          container
          spacing={3}
          style={{ padding: '5% 10%' }}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={6}>
            <Paper elevation={2} className={classes.rootSearch}>
              <InputBase
                className={classes.input}
                placeholder="Buscar por Cliente"
                inputProps={{ 'aria-label': 'Buscar por nombre o descripción' }}
              />
              <IconButton
                // onClick={}
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Print />}
                className={classes.newButton}
                onClick={() => {}}
              >
                Imprimir
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Paper display="flex" justifyContent="center">
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.head} align="center">
                          Cliente
                        </TableCell>
                        <TableCell className={classes.head} align="center">
                          Estado
                        </TableCell>
                        <TableCell className={classes.head} align="center">
                          Monto Total
                        </TableCell>
                        <TableCell className={classes.head} align="center">
                          Fecha
                        </TableCell>
                        <TableCell className={classes.head} align="center">
                          Productos
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {venta.length ? (
                        venta.map((venta, index) => {
                          const {
                            nombre,
                            apellido,
                            total,
                            status,
                            createdAt,
                            detalle,
                          } = venta;
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
                              <TableCell align="center">{`${nombre} ${apellido}`}</TableCell>
                              <TableCell align="center">{`${
                                status ? 'Completada' : 'Cancelada'
                              }`}</TableCell>
                              <TableCell align="center">{total}</TableCell>
                              <TableCell align="center">
                                {formatDate(createdAt)}
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  onClick={() => {
                                    setGetDetalle(detalle);
                                    setOpenPopup(true);
                                  }}
                                >
                                  <Visibility />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow className={classes.emptyRow}>
                          <TableCell align="center" colSpan="2">
                            <span className={classes.tableLabel}>
                              No hay ventas registrados
                            </span>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Container style={{ marginLeft: drawerWidth }}>
        <Popup
          title="Detalle Productos"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <Paper display="flex" justifyContent="center">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.head} align="center">
                      Nombre
                    </TableCell>
                    <TableCell className={classes.head} align="center">
                      Descripción
                    </TableCell>
                    <TableCell className={classes.head} align="center">
                      Cantidad
                    </TableCell>
                    <TableCell className={classes.head} align="center">
                      Costo
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {getDetalle.length ? (
                    getDetalle.map((detalle, index) => {
                      const { nombre, descripcion, cantidad, precio } = detalle;
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
                          <TableCell align="center">{descripcion}</TableCell>
                          <TableCell align="center">{cantidad}</TableCell>
                          <TableCell align="center">{Number.parseFloat(precio).toFixed(2)}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow className={classes.emptyRow}>
                      <TableCell align="center" colSpan="2">
                        <span className={classes.tableLabel}>
                          No hay getDetalles registrados
                        </span>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Popup>
      </Container>
    </div>
  );
};

export default ReportVenta;
