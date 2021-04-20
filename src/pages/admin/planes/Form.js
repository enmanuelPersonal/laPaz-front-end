import React, { useState, useEffect } from 'react';
import 'date-fns';
import {
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Box,
  Button,
  makeStyles,
  Container,
} from '@material-ui/core';
import { Add, Search } from '@material-ui/icons';

import Form from '../../../components/Form';
import { get } from '../../../helpers/fetch';
import Popup from '../../../components/Popup';
import { drawerWidth } from '../../../utils/consts';
import { FormTipoPlan } from './TipoPlan';
import TableSelectProuct from '../productos/TableSelectProduct';
import ProductForm from '../productos/Form';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
    textTransform: 'none',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  checkBoxGroup: {
    marginTop: theme.spacing(3),
  },
  addBtn: {
    height: '100%',
  },
  form: {
    width: 350,
  },
}));

const initialBodyProduct = {
  descripcion: '',
};

const FormArmarPlan = ({
  setProductBodySelect,
  productBodySelect,
  setGetTypePlan,
  getTypePlan,
  setGetProductPlan,
  getIdTypePlan,
  setGetIdTypePlan,
}) => {
  const classes = useStyles();
  const [openPopupSelecctProducto, setOpenPopupSelecctProducto] = useState(
    false
  );
  const [openPopupTypePlan, setOpenPopupTypePlan] = useState(false);
  const [openPopupProducto, setOpenPopupProducto] = useState(false);
  const [getUnidadMedida, setGetUnidadMedida] = useState([]);

  const [productCantidad, setProductCantidad] = useState(1);
  const [productBody, setProductBody] = useState(initialBodyProduct);
  const [productoId, setProductoId] = useState('');
  const [getIdUnidadMedida, setGetIdUnidadMedida] = useState('');

  const { descripcion } = productBody;

  useEffect(() => {
    const fetchGetTypePlan = async () => {
      await get('typePlan')
        .then((res) => res.json())
        .then(({ data }) => setGetTypePlan(data))
        .catch(() => {});
    };

    const fetchGetUnidadMedida = async () => {
      await get('unidadMedida')
        .then((res) => res.json())
        .then(({ data }) => setGetUnidadMedida(data))
        .catch(() => {});
    };

    fetchGetTypePlan();
    fetchGetUnidadMedida();

    // eslint-disable-next-line
  }, [openPopupTypePlan]);

  useEffect(() => {
    const fetchGetProductPlan = async () => {
      await get(`plan/${getIdTypePlan}`)
        .then((res) => res.json())
        .then(({ data }) => {
          setProductBodySelect([...data]);
          setGetProductPlan(data);
        })
        .catch(() => {});
    };

    if (getIdTypePlan) {
      fetchGetProductPlan();
    }

    // eslint-disable-next-line
  }, [getIdTypePlan]);

  const handleAddProduct = () => {
    let unidadMedida = '';
    getUnidadMedida.forEach(({ descripcion, idUnidadMedida }) => {
      if (idUnidadMedida === getIdUnidadMedida) {
        unidadMedida = descripcion;
      }
    });
    Object.assign(
      productBody,
      { cantidad: productCantidad },
      { idUnidadMedida: getIdUnidadMedida },
      { unidadMedida: unidadMedida }
    );
    setProductBodySelect([...productBodySelect, productBody]);
    setProductCantidad(1);
    setProductBody(initialBodyProduct);
    setProductoId('');
    setGetIdUnidadMedida('');
  };

  return (
    <Form className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Tipo</InputLabel>
            <Select
              label="Tipo"
              name="idTipoProducto"
              value={getIdTypePlan}
              onChange={({ target: { value } }) => setGetIdTypePlan(value)}
            >
              <MenuItem disabled value="">
                Seleccione su tipo
              </MenuItem>
              {getTypePlan.map(({ idTipoPlan, tipo }) => (
                <MenuItem key={idTipoPlan} value={idTipoPlan}>
                  {tipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              style={{ backgroundColor: '#630F5C', color: '#fff' }}
              aria-label="add"
              component="span"
              onClick={() => {
                setOpenPopupTypePlan(true);
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
            label={descripcion ? '' : 'Nombre'}
            value={descripcion}
            disabled={true}
          />
        </Grid>

        <Grid item xs={5}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              className={classes.button}
              style={{ backgroundColor: '#939393', color: '#fff' }}
              aria-label="add"
              component="span"
              onClick={() => {
                setOpenPopupSelecctProducto(true);
              }}
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
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel className={classes.inputLabel}>
              Unidad de Medida
            </InputLabel>
            <Select
              label="Tipo"
              name="unidadMedida"
              size="small"
              value={getIdUnidadMedida}
              onChange={({ target: { value } }) => setGetIdUnidadMedida(value)}
            >
              <MenuItem disabled value="">
                Seleccione Unidad de Medida
              </MenuItem>
              {getUnidadMedida.map(({ idUnidadMedida, descripcion }) => (
                <MenuItem key={idUnidadMedida} value={idUnidadMedida}>
                  {descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <TextField
            variant="outlined"
            name="cantidad"
            type="number"
            label="Cantidad"
            fullWidth
            value={productCantidad}
            onChange={({ target: { value } }) =>
              setProductCantidad(parseInt(value))
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
      <Container style={{ marginLeft: drawerWidth }}>
        <Popup
          title={'Seleccionar Productos y servicios'}
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

      {openPopupTypePlan && (
        <FormTipoPlan setOpen={setOpenPopupTypePlan} open={openPopupTypePlan} />
      )}
    </Form>
  );
};

export default FormArmarPlan;
