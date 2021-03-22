import React, { useState } from 'react';
import { Add, PeopleOutlineTwoTone } from '@material-ui/icons';
import { Container, makeStyles } from '@material-ui/core';

import Form from './Form';
import PageHeader from '../../../components/PageHeader';
import { Button } from '../../../components/controls/Controls';
import Popup from '../../../components/Popup';

import { drawerWidth } from '../../../utils/consts.js';

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
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const addOrEdit = (employee, resetForm) => {
    // insertar empleados
  };

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
          setRecordForEdit(null);
        }}
      />
      <Container style={{ marginLeft: drawerWidth }}>
        <Popup
          title="Formulario de Empleado"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <Form recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
        </Popup>
      </Container>
    </React.Fragment>
  );
};

export default Employe;
