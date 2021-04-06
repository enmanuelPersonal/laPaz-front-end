import React, { useState } from 'react';
import { PeopleOutlineTwoTone } from '@material-ui/icons';
import {
  Search as SearchIcon,
  FindInPage,
  Archive,
  ViewList,
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
} from '@material-ui/core';

import PageHeader from '../../../components/PageHeader';
import Popup from '../../../components/Popup';

import { drawerWidth } from '../../../utils/consts.js';
import TableInventario from './TableInventario';

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
}));

const Inventario = () => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [edit, setEdit] = useState(false);
  const [body, setBody] = useState({});

  return (
    <div  >
      <PageHeader
        className={classes.root}
        title="Inventario"
        subTitle="Registrar, consultar y actualizar"
        icon={<PeopleOutlineTwoTone fontSize="large" />}
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
                placeholder="Buscar por nombre o descripción"
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
                startIcon={<FindInPage />}
                className={classes.newButton}
                onClick={() => {}}
              >
                Ver inventario
              </Button>

              <Button
                variant="contained"
                color="primary"
                startIcon={<Archive />}
                className={classes.newButton}
                onClick={() => {}}
              >
                Productos
              </Button>

              <Button
                variant="contained"
                color="primary"
                startIcon={<ViewList />}
                className={classes.newButton}
                onClick={() => {}}
              >
                Registrar compras
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TableInventario
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
          title={`${edit ? 'Actualizar Inventario' : 'Registrar Inventario'}`}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        ></Popup>
      </Container>
    </div>
  );
};

export default Inventario;
