import React, { useState, useEffect } from 'react';
import {
  PeopleOutlineTwoTone,
  Cancel,
  ExitToApp,
  Search,
  Add,
} from '@material-ui/icons';
import {
  makeStyles,
  Box,
  Grid,
  Button,
  TextField,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';

import { drawerWidth } from '../../../utils/consts.js';

import TableCompra from './TableCompra';
import PageHeader from '../../../components/PageHeader';
import Popup from '../../../components/Popup';
import ProductForm from '../productos/Form.js';
import FormSuplidor from '../suplidor/Form.js';
import TableSelectSuplidor from '../suplidor/TableSelectSuplidor.js';
import TableSelectProuct from '../productos/TableSelectProduct';
import { get, post } from '../../../helpers/fetch.js';
import { DialogSlide } from '../../../components/alert/DialogSlide.js';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
  newButton: {
    textTransform: 'none',
  },
  input: {
    flex: 1,
  },
  rootSearch: {
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
  containerTable: {
    marginLeft: drawerWidth + 15,
    backgroundColor: '#fff',
    marginRight: 15,
    borderRadius: 10,
    padding: '1rem',
  },
  btn: {
    marginRight: theme.spacing(1),
  },
}));

const initialState = {
  cantidad: 1,
  precio: 0,
};

const initialBodyProduct = {
  nombre: '',
};

const Compra = () => {
  const classes = useStyles();
  const [openPopupSelecctSuplidor, setOpenPopupSelecctSuplidor] = useState(
    false
  );
  const [openPopupSelecctProducto, setOpenPopupSelecctProducto] = useState(
    false
  );
  const [errorServer, setErrorServer] = useState(false);
  const [isSuscripcionSuccess, setIsCompraSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPopupProducto, setOpenPopupProducto] = useState(false);
  const [openPopupSuplidor, setOpenPopupSuplidor] = useState(false);
  const [productBodySelect, setProductBodySelect] = useState([]);
  const [getItebis, setGetItebis] = useState([]);
  const [productAdd, setProductAdd] = useState(initialState);

  const [suplidorId, setSuplidorId] = useState('');
  const [getTotal, setGetTotal] = useState(0.0);
  const [getSubTotal, setGetSubTotal] = useState(0.0);
  const [suplidorName, setSuplidorName] = useState('');
  const [productoId, setProductoId] = useState('');
  const [getItebisId, setGetItebisId] = useState('');
  const [productBody, setProductBody] = useState(initialBodyProduct);

  const { nombre: descripcion } = productBody;
  const { cantidad, precio } = productAdd;

  useEffect(() => {
    get('itebis')
      .then((res) => res.json())
      .then(({ data }) => {
        setGetItebis(data || []);
      });
  }, []);

  const handleChange = ({ value, name }) => {
    setProductAdd({ ...productAdd, [name]: value });
  };

  const handleAddProduct = () => {
    Object.assign(productBody, { cantidad }, { precio });
    setProductBodySelect([...productBodySelect, productBody]);
    setProductAdd(initialState);
    setProductBody(initialBodyProduct);
    setProductoId('');
  };

  const handleClose = () => {
    setOpenDialog(false);
    setErrorServer(false);
    if (isSuscripcionSuccess) {
      setIsCompraSuccess(false);
    }
  };

  const handleSave = () => {
    const userData = {};

    const detalle = productBodySelect.map(
      ({ idProducto, cantidad, precio }) => ({
        idProducto,
        cantidad,
        precio,
      })
    );

    Object.assign(
      userData,
      { detalle },
      { total: getTotal },
      { idSuplidor: suplidorId }
    );

    return post('compra/add', userData)
      .then(async (response) => {
        if (response.status === 201) {
          setErrorServer(false);
          setIsCompraSuccess(true);
          cleanForm();
        } else {
          const res = await response.json();
          setErrorServer(res.message);
        }
      })
      .catch((err) =>
        setErrorServer('Verifique que todos los campos esten correctos')
      )
      .finally(() => setOpenDialog(true));
  };

  const cleanForm = () => {
    setProductBodySelect([]);
    setProductAdd(initialState);
    setProductBody(initialBodyProduct);
    setProductoId('');
    setGetSubTotal(0.0);
    setGetTotal(0.0);
    setSuplidorName('');
    setGetItebisId('');
  };

  return (
    <div>
      <PageHeader
        className={classes.root}
        title="Compras"
        subTitle="Registrar, consultar y actualizar"
        icon={<PeopleOutlineTwoTone fontSize="large" />}
      />
      <Box
        justifyContent="center"
        display="flex"
        className={classes.containerTable}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" mb={2}>
              <Box flexGrow={1}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<Cancel />}
                  onClick={cleanForm}
                >
                  Cancelar
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#630F5C',
                    color: '#fff',
                  }}
                  className={classes.button}
                  startIcon={<ExitToApp />}
                  onClick={handleSave}
                >
                  Finalizar
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <TextField
                  variant="outlined"
                  name="suplidor"
                  type="text"
                  size="small"
                  fullWidth
                  disabled={true}
                  label={suplidorName ? '' : 'Suplidor'}
                  value={suplidorName}
                />
              </Grid>
              <Grid item xs={5}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    className={classes.btn}
                    style={{ backgroundColor: '#939393', color: '#fff' }}
                    aria-label="add"
                    component="span"
                    onClick={() => setOpenPopupSelecctSuplidor(true)}
                  >
                    <Search />
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#630F5C', color: '#fff' }}
                    aria-label="add"
                    component="span"
                    onClick={() => {
                      setOpenPopupSuplidor(true);
                    }}
                  >
                    <Add />
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box fontWeight="fontWeightBold" fontSize={18}>
                  Producto:
                </Box>
              </Grid>

              <Grid item xs={7}>
                <TextField
                  variant="outlined"
                  name="nombre"
                  type="text"
                  size="small"
                  label={descripcion ? '' : 'Nombre'}
                  value={descripcion}
                  disabled={true}
                />
              </Grid>

              <Grid item xs={5}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    className={classes.btn}
                    style={{ backgroundColor: '#939393', color: '#fff' }}
                    aria-label="add"
                    component="span"
                    onClick={() => setOpenPopupSelecctProducto(true)}
                  >
                    <Search />
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#630F5C', color: '#fff' }}
                    aria-label="add"
                    component="span"
                    onClick={() => {
                      setOpenPopupProducto(true);
                    }}
                  >
                    <Add />
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  name="precio"
                  type="number"
                  size="small"
                  label="Precio"
                  value={precio}
                  onChange={({ target: { value, name } }) =>
                    handleChange({ value: parseFloat(value), name })
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  name="cantidad"
                  type="number"
                  size="small"
                  label="Cantidad"
                  fullWidth
                  value={cantidad}
                  onChange={({ target: { value, name } }) =>
                    handleChange({ value: parseInt(value), name })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#630F5C', color: '#fff' }}
                  startIcon={<Add />}
                  fullWidth
                  onClick={handleAddProduct}
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>ITBIS</InputLabel>
                  <Select
                    label="Tipo"
                    name="idItebis"
                    value={getItebisId}
                    onChange={({ target: { value } }) => setGetItebisId(value)}
                  >
                    <MenuItem disabled value="">
                      Seleccione ITBIS
                    </MenuItem>
                    {getItebis.map(({ porcentaje }) => (
                      <MenuItem key={porcentaje} value={porcentaje}>
                        {porcentaje}
                      </MenuItem>
                    ))}
                    ))
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  name="subTotal"
                  type="text"
                  fullWidth
                  label={getSubTotal ? '' : 'Subtotal'}
                  disabled={true}
                  value={getSubTotal.toString()}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  name="total"
                  type="text"
                  fullWidth
                  label={getTotal ? '' : 'Total'}
                  disabled={true}
                  value={getTotal.toString()}
                />
              </Grid>
              <Grid item xs={12}>
                <TableCompra
                  setProductBodySelect={setProductBodySelect}
                  productBodySelect={productBodySelect}
                  setGetTotal={setGetTotal}
                  setGetSubTotal={setGetSubTotal}
                  getItebisId={getItebisId}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Container style={{ marginLeft: drawerWidth }}>
        <Popup
          title={'Seleccionar Suplidor'}
          openPopup={openPopupSelecctSuplidor}
          setOpenPopup={setOpenPopupSelecctSuplidor}
        >
          <TableSelectSuplidor
            setSuplidorId={setSuplidorId}
            suplidorId={suplidorId}
            setSuplidorName={setSuplidorName}
            setOpen={setOpenPopupSelecctSuplidor}
          />
        </Popup>
        <Popup
          title={'Seleccionar Producto'}
          openPopup={openPopupSelecctProducto}
          setOpenPopup={setOpenPopupSelecctProducto}
        >
          <TableSelectProuct
            setProductoId={setProductoId}
            productoId={productoId}
            setProductBody={setProductBody}
            setOpen={setOpenPopupSelecctProducto}
          />
        </Popup>
        <Popup
          title="Registrar Producto"
          openPopup={openPopupProducto}
          setOpenPopup={setOpenPopupProducto}
        >
          <ProductForm setOpenPopup={setOpenPopupProducto} />
        </Popup>
      </Container>
      <Container style={{ marginLeft: drawerWidth }}>
        <Popup
          title="Registrar Suplidor"
          openPopup={openPopupSuplidor}
          setOpenPopup={setOpenPopupSuplidor}
        >
          <FormSuplidor setOpenPopup={setOpenPopupSuplidor} />
        </Popup>
      </Container>
      {openDialog && (
        <DialogSlide
          handleClose={handleClose}
          openDialog={openDialog}
          title={
            !errorServer
              ? 'Compra completada!'
              : 'La compra no se pudo completar'
          }
          body={
            !errorServer
              ? 'Su compra se ha completado correctamente.'
              : `El registro no se pudo completar. ${errorServer} `
          }
        />
      )}
    </div>
  );
};

export default Compra;
