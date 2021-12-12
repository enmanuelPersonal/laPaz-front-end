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
  Button,
  Checkbox,
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
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
}));

const TableSelectProuct = ({
  setProductBody,
  productBody,
  setProductoId,
  productoId,
  setOpen,
}) => {
  const classes = useStyles();
  const [productos, setProductos] = useState([]);
  const [ProductoSelect, setProductoSelect] = useState("");
  const [ProductoBodySelect, setProductoBodySelect] = useState("");

  useEffect(() => {
    get("producto/all")
      .then((res) => res.json())
      .then(({ data }) => {
        const parseData = data.map((data) => {
          let checked = false;
          const { idProducto } = data;
          if (idProducto === productoId) {
            checked = true;
          }

          return {
            ...data,
            checked,
          };
        });
        setProductos(parseData || []);
      });

    // eslint-disable-next-line
  }, []);

  const handleSelect = (productId) => {
    const parseData = productos.map((data) => {
      const { idProducto, checked } = data;

      if (idProducto === productId) {
        setProductoSelect(!checked ? productId : "");
        setProductoBodySelect(data);
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
    setProductos(parseData || []);
  };

  const handleSave = () => {
    setProductBody(ProductoBodySelect);
    setProductoId(ProductoSelect);
    setOpen(false);
  };

  return (
    <div>
      <Paper display="flex" justifyContent="center">
        <TableContainer style={{ height: 500 }}>
          <Table>
            {productos.length > 0 ? (
              <TableHead>
                <TableRow>
                  <TableCell className={classes.head} align="center">
                    Nombre
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Descripcion
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Tipo
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    categoria
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Precio
                  </TableCell>
                  <TableCell className={classes.head} align="center">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
            ) : null}
            <TableBody>
              {productos.length ? (
                productos.map((producto, index) => {
                  const {
                    idProducto,
                    nombre,
                    descripcion,
                    tipo,
                    categoria,
                    log: { precio },
                    checked,
                  } = producto;
                  return (
                    <TableRow
                      hover
                      key={index}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: "#fff" }
                          : { backgroundColor: "#ECECEC" }
                      }
                    >
                      <TableCell align="center">{nombre}</TableCell>
                      <TableCell align="center">{descripcion}</TableCell>
                      <TableCell align="center">{tipo}</TableCell>
                      <TableCell align="center">{categoria}</TableCell>
                      <TableCell align="center">
                        {Number.parseFloat(precio).toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          name={idProducto}
                          checked={checked}
                          onChange={() => handleSelect(idProducto)}
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className={classes.emptyRow}>
                  <TableCell align="center" colSpan="2">
                    <span className={classes.tableLabel}>
                      No hay Productos registrados
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

export default TableSelectProuct;
