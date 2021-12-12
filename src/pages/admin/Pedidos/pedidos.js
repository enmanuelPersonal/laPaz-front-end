import React, { useEffect, useState, forwardRef } from "react";
import {
  Search as SearchIcon,
  LocalShipping,
  Print,
  Visibility,
} from "@material-ui/icons";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";

import { DeleteForever, Edit } from "@material-ui/icons";

import PageHeader from "../../../components/PageHeader";
import Popup from "../../../components/Popup";
import { drawerWidth } from "../../../utils/consts.js";
import { get, remove } from "../../../helpers/fetch";
import { formatDate } from "../../../helpers/formatDate";
import FormPedidos from "./Form";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  newButton: {
    textTransform: "none",
    marginLeft: "15px",
  },
  input: {
    flex: 1,
  },
  rootSearch: {
    width: "60%",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  paper: {
    marginLeft: drawerWidth,
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#ffff",
  },
  registerBtn: {
    marginLeft: "5px",
  },
  containerTable: {
    marginLeft: drawerWidth + 15,
    backgroundColor: "#fff",
    marginRight: 15,
    borderRadius: 10,
  },
  emptyRow: {
    height: "200px",
  },
  tableLabel: {
    color: "#630F5C",
    fontSize: "16px",
    fontFamily: "Montserrat",
    fontWeight: "bold",
  },
  head: {
    fontWeight: "bold",
    color: "#630F5C",
    backgroundColor: "#E6C3E2",
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReportPedidos = () => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupStatus, setOpenPopupStatus] = useState(false);
  const [numPedidoDelete, setNumPedidoDelete] = useState({});
  const [pedido, setPedido] = useState([]);
  const [body, setBody] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [getDetalle, setGetDetalle] = useState([]);

  useEffect(() => {
    get("pedido")
      .then((res) => res.json())
      .then(({ data }) => {
        setPedido(data || []);
      });
    // eslint-disable-next-line
  }, [openDialog, openDialogForm]);

  const handleUpdate = (usuario) => {
    setBody(usuario);
    setOpenPopupStatus(true);
  };

  const handleDelete = () => {
    return remove("pedido", numPedidoDelete)
      .then((res) => res.json())
      .then(({ data }) => {
        if (data[0] === 1) {
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenDialog(false));
  };

  return (
    <div>
      <PageHeader
        className={classes.root}
        title="Pedidos"
        subTitle="Registrar pedidos, Consultar e Imprimir"
        icon={<LocalShipping fontSize="large" />}
      />
      <Box
        justifyContent="center"
        display="flex"
        className={classes.containerTable}
      >
        <Grid
          container
          spacing={3}
          style={{ padding: "5% 10%" }}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={6}>
            <Paper elevation={2} className={classes.rootSearch}>
              <InputBase
                className={classes.input}
                placeholder="Buscar por Suplidor"
                inputProps={{ "aria-label": "Buscar por nombre o descripción" }}
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
                          Suplidor
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
                        <TableCell className={classes.head} align="center">
                          Fecha Entrega
                        </TableCell>
                        <TableCell className={classes.head} align="center">
                          Acciones
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {pedido.length ? (
                        pedido.map((pedido, index) => {
                          const {
                            numPedido,
                            nombre,
                            apellido,
                            total,
                            status,
                            createdAt,
                            fechaEntrega,
                            detalle,
                            idSuplidor,
                          } = pedido;
                          return (
                            <TableRow
                              hover
                              key={`${nombre} - ${index}`}
                              style={
                                index % 2 === 0
                                  ? { backgroundColor: "#fff" }
                                  : { backgroundColor: "#ECECEC" }
                              }
                            >
                              <TableCell align="center">{`${nombre} ${apellido}`}</TableCell>
                              <TableCell align="center">{`${status}`}</TableCell>
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
                              <TableCell align="center">
                                {fechaEntrega
                                  ? formatDate(fechaEntrega)
                                  : "No Entregado"}
                              </TableCell>
                              <TableCell align="center">
                                {status !== "Completado" ? (
                                  <Edit onClick={() => handleUpdate(pedido)} />
                                ) : (
                                  " "
                                )}
                                <DeleteForever
                                  onClick={() => {
                                    setNumPedidoDelete({
                                      numPedido,
                                      idSuplidor,
                                      total,
                                      fecha: formatDate(createdAt),
                                    });
                                    setOpenDialog(true);
                                  }}
                                />{" "}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow className={classes.emptyRow}>
                          <TableCell align="center" colSpan="2">
                            <span className={classes.tableLabel}>
                              No hay Pedidos registrados
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
          title={`Actualizar estado del Pedido`}
          openPopup={openPopupStatus}
          setOpenPopup={setOpenPopupStatus}
        >
          <FormPedidos body={body} setOpenDialogForm={setOpenDialogForm} />
        </Popup>
      </Container>
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
                              ? { backgroundColor: "#fff" }
                              : { backgroundColor: "#ECECEC" }
                          }
                        >
                          <TableCell align="center">{nombre}</TableCell>
                          <TableCell align="center">{descripcion}</TableCell>
                          <TableCell align="center">{cantidad}</TableCell>
                          <TableCell align="center">
                            {Number.parseFloat(precio).toFixed(2)}
                          </TableCell>
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
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Cancelar Pedido</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Está seguro que desea cancelar este pedido?
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

export default ReportPedidos;
