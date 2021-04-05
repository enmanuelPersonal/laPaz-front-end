import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import {
  Grid,
  TextField,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextareaAutosize,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Form from '../../../components/Form';
import { get, post, put } from '../../../helpers/fetch';
import { uploadImagen } from '../../../helpers/uploadImagen';
import { DialogSlide } from '../../../components/alert/DialogSlide';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

let initialState = {
  nombre: '',
  descripcion: '',
  idTipoProducto: '',
  idCategoria: '',
  url: '',
  reorden: 0,
};

const ProductForm = ({ edit = false, body = {}, setOpenPopup }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [isProductSuccess, setIsProductSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productoData, setProductoData] = useState(initialState);
  const [getTipoProducto, setGetTipoProducto] = useState([]);
  const [getCategoria, setGetCategoria] = useState([]);
  const [uploadImg, setUploadImg] = useState('');

  const {
    nombre,
    descripcion,
    idTipoProducto,
    idCategoria,
    reorden,
  } = productoData;

  useEffect(() => {
    const fetchGetTipoProducto = async () => {
      await get('producto/type')
        .then((res) => res.json())
        .then(({ data }) => {
          if (!edit) {
            data.forEach(({ idTipoProducto, tipo }) => {
              if (tipo === 'producto') {
                setProductoData({ ...productoData, idTipoProducto });
                return;
              }
            });
          }

          setGetTipoProducto(data);
        })
        .catch(() => {});
    };

    const fetchGetCategoria = async () => {
      await get('producto/categorias')
        .then((res) => res.json())
        .then(({ data }) => setGetCategoria(data))
        .catch(() => {});
    };

    if (getTipoProducto && !getTipoProducto.length) fetchGetTipoProducto();

    if (getCategoria && !getCategoria.length) fetchGetCategoria();

    if (edit) {
      const {
        nombre,
        descripcion,
        idTipoProducto,
        idCategoria,
        imagenes,
        log: { reorden },
      } = body;
      let url = '/img/qqq';

      if (imagenes.length) {
        url = imagenes[0].url;
      }

      setProductoData({
        ...productoData,
        nombre,
        descripcion,
        idTipoProducto,
        idCategoria,
        url,
        reorden,
      });
    } else {
      cleanForm();
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = ({ value, name }) => {
    setProductoData({ ...productoData, [name]: value });
  };

  const onChangeImagen = ({ target: { files } }) => {
    setUploadImg(files);
  };

  const cleanForm = () => {
    setProductoData(initialState);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setErrorServer(false);
    if (isProductSuccess) {
      setIsProductSuccess(false);
    }
    setOpenPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(uploadImg);
    // await uploadImagen(uploadImg);

    // Falta enviarle la url de la imagen
    if (!edit) {
      return post('producto/add', productoData)
        .then(async (response) => {
          setLoading(false);
          if (response.status === 201) {
            setErrorServer(false);
            setIsProductSuccess(true);
            cleanForm();
          } else {
            const res = await response.json();
            setErrorServer(res.message);
          }
        })
        .catch((err) => setErrorServer(err.message))
        .finally(() => setOpenDialog(true));
    } else {
      const {
        idProducto,
        imagenes,
        log: { idProductoLog },
      } = body;
      let idImagenProducto = '';

      if (imagenes.length) {
        idImagenProducto = imagenes[0].idImagenProducto;
      }

      Object.assign(
        productoData,
        { idImagenProducto },
        { idProductoLog },
        { idProducto }
      );

      return put('producto', productoData)
        .then((res) => res.json())
        .then(({ data }) => {
          if (data[0] === 1) {
            setErrorServer(false);
            setIsProductSuccess(true);
            cleanForm();
          }
        })
        .catch((err) => setErrorServer(err.message))
        .finally(() => setOpenDialog(true));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={3} lg={3}>
          <TextField
            className={classes.textField}
            variant="outlined"
            name="nombre"
            label="Nombre"
            type="text"
            value={nombre}
            onChange={({ target: { value, name } }) =>
              handleChange({ value, name })
            }
            fullWidth
          />
          <FormControl variant="outlined">
            <InputLabel>Tipo</InputLabel>
            <Select
              label="Tipo"
              name="idTipoProducto"
              value={idTipoProducto}
              onChange={({ target: { value, name } }) =>
                handleChange({ value, name })
              }
            >
              <MenuItem disabled value="">
                Seleccione su tipo
              </MenuItem>
              {getTipoProducto.map(({ idTipoProducto, tipo }) => (
                <MenuItem key={idTipoProducto} value={idTipoProducto}>
                  {tipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className={classes.textField}
            variant="outlined"
            name="reorden"
            label="Reorden"
            type="number"
            value={reorden}
            onChange={({ target: { value, name } }) =>
              handleChange({ value, name })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={3} lg={3}>
          <TextField
            className={classes.textField}
            variant="outlined"
            name="descripcion"
            label="Descripción"
            type="text"
            value={descripcion}
            onChange={({ target: { value, name } }) =>
              handleChange({ value, name })
            }
            fullWidth
          />
          <FormControl variant="outlined">
            <InputLabel>Categoría</InputLabel>
            <Select
              label="Categoría"
              name="idCategoria"
              value={idCategoria}
              onChange={({ target: { value, name } }) =>
                handleChange({ value, name })
              }
            >
              <MenuItem disabled value="">
                Seleccione su Categoría
              </MenuItem>
              {getCategoria.map(({ idCategoria, categoria }) => (
                <MenuItem key={idCategoria} value={idCategoria}>
                  {categoria}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} lg={4}>
          <Box border={1} p={8} mb={2}></Box>
          <input
            // accept="image/*"
            className={classes.input}
            id="contained-button-file"
            // multiple
            type="file"
            onChange={onChangeImagen}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Subir imagen
            </Button>
          </label>
        </Grid>
        <Grid item xs={3} lg={4}>
          {/* <div style={{ marginTop: 50 }}> */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
          >
            {loading ? (
              <div className={classes.loading}>
                <CircularProgress />
              </div>
            ) : (
              `${edit ? 'ACTUALIZAR' : 'GUARDAR'}`
            )}
          </Button>
          <Button
            variant="contained"
            size="large"
            color="inherit"
            className={classes.button}
            onClick={cleanForm}
          >
            {' '}
            LIMPIAR
          </Button>
          {/* </div> */}
        </Grid>
        {openDialog && (
          <DialogSlide
            handleClose={handleClose}
            openDialog={openDialog}
            title={
              !errorServer
                ? edit
                  ? 'Datos Actualizados!'
                  : 'Registro completado!'
                : edit
                ? 'La Actualizacion no se pudo completar'
                : 'El registro no se pudo completar'
            }
            body={
              !errorServer
                ? edit
                  ? 'Su Actualizacion se ha completado correctamente.'
                  : 'Su registro se ha completado correctamente.'
                : `${
                    edit ? 'La  actualizacion' : 'El registro'
                  } no se pudo completar. ${errorServer} `
            }
          />
        )}
      </Grid>
    </Form>
  );
};
export default ProductForm;
