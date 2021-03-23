import React, { useState } from 'react';
import { Add, PeopleOutlineTwoTone } from '@material-ui/icons';
import { Container, makeStyles } from '@material-ui/core';

import Form from './Form';
import PageHeader from '../../../components/PageHeader';
import { Button } from '../../../components/controls/Controls';
import Popup from '../../../components/Popup';

import { drawerWidth } from '../../../utils/consts.js';
import TableEmploye from './TableEmploye';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
  newButton: {
    position: 'absolute',
    right: '10px',
  },
}));

const Employe = () => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [edit, setEdit] = useState(false);
  const [body, setBody] = useState({});

  return (
    <React.Fragment>
      <PageHeader
        title="Nuevo Empleado"
        subTitle="Registrar y consultar"
        icon={<PeopleOutlineTwoTone fontSize="large" />}
      />
      <Button
        text="Agregar nuevo empleado"
        variant="outlined"
        startIcon={<Add />}
        className={classes.newButton}
        onClick={() => {
          setOpenPopup(true);
        }}
      />
      <Container style={{ marginLeft: drawerWidth }}>
        <Popup
          title={`${edit ? 'Actualizar Empleado' : 'Registrar Empleado'}`}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <Form edit={edit} body={body} />
        </Popup>
      </Container>
      <Container>
        <TableEmploye
          setEdit={setEdit}
          setBody={setBody}
          setOpenPopup={setOpenPopup}
        />
      </Container>
    </React.Fragment>
  );
};

export default Employe;
