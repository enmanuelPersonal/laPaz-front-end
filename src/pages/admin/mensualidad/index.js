import React, { useState } from 'react';
import { Add, PeopleOutlineTwoTone } from '@material-ui/icons';
import {
  Container,
  makeStyles,
  Box,
  Grid,
  Button,
} from '@material-ui/core';

import Form from './Form';
import PageHeader from '../../../components/PageHeader';
import Popup from '../../../components/Popup';

import { drawerWidth } from '../../../utils/consts.js';
import TableMensualidad from './TableMensualidad';

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
  popup: {},
}));

const Mensualidad = () => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [edit, setEdit] = useState(false);
  const [body, setBody] = useState({});

  return (
    <div>
      <PageHeader
        className={classes.root}
        title="Mensualidad"
        subTitle="Registrar y consultar"
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
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add style={{ fontSize: 22 }} />}
                className={classes.newButton}
                onClick={() => {
                  setEdit(false);
                  setOpenPopup(true);
                }}
              >
                Pagar Mensualidad
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TableMensualidad
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
          title="Pago de Mensualidad"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <Form edit={edit} body={body} setOpenPopup={setOpenPopup} />
        </Popup>
      </Container>
    </div>
  );
};

export default Mensualidad;
