import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import { get } from "../../../helpers/fetch";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: "-108px",
    minWidth: "92%",
    margin: "auto",
    height: "500px",
    display: "block",
    textAlign: "center",
    justifyContent: "center",
    "& > div:first-child": {
      "&::before": {
        position: "absolute",
        top: "-60px",
        left: "0",
        color: "#00205C",
        "font-size": "20px",
        "font-family": "Montserrat",
        "font-weight": "bold",
      },
    },
    [theme.breakpoints.down(400)]: {
      bottom: "1em",
      height: "55vh",
    },
    [theme.breakpoints.down(700)]: {
      top: "0",
      left: "0",
      right: "0",
    },
    [theme.breakpoints.down(1400)]: {
      top: "200px",
      left: "0",
      right: "0",
    },
    [theme.breakpoints.up(1400)]: {
      top: "340px",
      left: "0",
      right: "0",
    },
    [theme.breakpoints.down(1300)]: {
      marginLeft: 250,
    },
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

const TableInventario = () => {
  const classes = useStyles();
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    get("inventario")
      .then((res) => res.json())
      .then(({ data }) => {
        setInventario(data || []);
      });
  }, []);

  return (
    <div>
      <Paper display="flex" justifyContent="center">
        <TableContainer>
          <Table>
            {inventario.length > 0 ? (
              <TableHead>
                <TableRow>
                  <TableCell className={classes.head} align="center">
                    Producto
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Descripción
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Categoria
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Tipo
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Unidades
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Precio
                  </TableCell>
                </TableRow>
              </TableHead>
            ) : null}
            <TableBody>
              {inventario.length ? (
                inventario.map((producto, index) => {
                  const {
                    idProducto,
                    descripcion,
                    tipo,
                    categoria,
                    nombre,
                    log: { stock, precio },
                    almacen,
                  } = producto;
                  return (
                    <TableRow
                      hover
                      key={idProducto}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: "#fff" }
                          : { backgroundColor: "#ECECEC" }
                      }
                    >
                      <TableCell align="center">{nombre}</TableCell>
                      <TableCell align="center">{descripcion}</TableCell>
                      <TableCell align="center">{categoria}</TableCell>
                      <TableCell align="center">{tipo}</TableCell>
                      <TableCell align="center">{stock}</TableCell>
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
                      No existe algún item en inventario
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

export default TableInventario;
