import React, { useState } from 'react';
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
                          Método
                        </TableCell>
                        <TableCell className={classes.head} align="center">
                          Usuario
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
                        {/* <TableCell className={classes.head} align="center">
                    Acciones
                  </TableCell> */}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <TableRow
                        hover
                        /*  key={idProducto}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: '#fff' }
                          : { backgroundColor: '#ECECEC' }
                      } */
                      >
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => {
                              setOpenPopup(true);
                            }}
                          >
                            <Visibility />
                          </Button>
                        </TableCell>
                        {/* <TableCell align="center">
                        <Edit onClick={() => handleUpdate(producto)} />
                      </TableCell> */}
                      </TableRow>
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
                      Tipo
                    </TableCell>
                    <TableCell className={classes.head} align="center">
                      Categoría
                    </TableCell>
                    <TableCell className={classes.head} align="center">
                      Costo
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow
                    hover
                    /*  key={idProducto}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: '#fff' }
                          : { backgroundColor: '#ECECEC' }
                      } */
                  >
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
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
