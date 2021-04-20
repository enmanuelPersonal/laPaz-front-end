import React, { useState } from 'react';
import { Add, Archive } from '@material-ui/icons';
import { Search as SearchIcon } from '@material-ui/icons';
import {
  Container,
  makeStyles,
  Box,
  Paper,
  Grid,
  Button,
  InputBase,
  IconButton,
} from '@material-ui/core';

import Form from './Form';
import PageHeader from '../../../components/PageHeader';
import Popup from '../../../components/Popup';

import { drawerWidth } from '../../../utils/consts.js';
import TableProducto from './TableProducto';

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
  },
}));

const Producto = () => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [edit, setEdit] = useState(false);
  const [body, setBody] = useState({});

  return (
    <div>
      <PageHeader
        className={classes.root}
        title="Nuevo Producto"
        subTitle="Registrar, consultar y actualizar"
        icon={<Archive fontSize="large" />}
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
          <Grid item xs={8}>
            <Paper
              component="form"
              elevation={2}
              className={classes.rootSearch}
            >
              <InputBase
                className={classes.input}
                placeholder="Buscar Producto por Nombre de Producto"
                inputProps={{
                  'aria-label': 'Buscar Producto por Nombre de Producto',
                }}
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
          <Grid item xs={4}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Add />}
                className={classes.newButton}
                onClick={() => {
                  setEdit(false);
                  setOpenPopup(true);
                }}
              >
                Agregar Producto
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TableProducto
              setEdit={setEdit}
              setBody={setBody}
              setOpenPopup={setOpenPopup}
              openPopup={openPopup}
            />
          </Grid>
        </Grid>
      </Box>

      <Container style={{ marginLeft: drawerWidth }}>
        <Popup
          title={`${edit ? 'Actualizar Producto' : 'Registrar Producto'}`}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <Form edit={edit} body={body} setOpenPopup={setOpenPopup} />
        </Popup>
      </Container>
    </div>
  );
};

export default Producto;
