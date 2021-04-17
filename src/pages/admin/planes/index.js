import React, { useState } from 'react';
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

import TablePlan from './TablePlan';

import PageHeader from '../../../components/PageHeader';
import Popup from '../../../components/Popup';

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

const Plan = () => {
  const classes = useStyles();
  const [openPopupProducto, setOpenPopupProducto] = useState(false);
  const [openPopupSuplidor, setOpenPopupSuplidor] = useState(false);
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
            <Box display="flex">
              <Box flexGrow={1}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<Cancel />}
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
                  label="Suplidor"
                  // error={Boolean(errors.nombre)}
                  //   helperText={errors.nombre ? 'El nombre es requerido' : ''}
                  /* inputRef={register({
                    required: true,
                  })}*/
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
                  label="Nombre"
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
                  type="text"
                  size="small"
                  label="Precio"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  name="cantidad"
                  type="text"
                  size="small"
                  label="Cantidad"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#630F5C', color: '#fff' }}
                  startIcon={<Add />}
                  fullWidth
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
                    name="idTipoProducto"
                    //value={}

                    /*onChange={({ target: { value, name } }) =>
                      handleChange({ value, name })
                    }*/
                  >
                    <MenuItem disabled value="">
                      Seleccione ITBIS
                    </MenuItem>
                    <MenuItem>18%</MenuItem>
                    ))
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  name="suplidor"
                  type="text"
                  label="Subtotal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  variant="outlined"
                  name="suplidor"
                  type="text"
                  label="Total"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TablePlan />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Plan;
