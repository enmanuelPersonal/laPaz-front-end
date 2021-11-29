import React, { useState } from 'react';
import { Assessment, Cancel, ExitToApp } from '@material-ui/icons';
import { makeStyles, Box, Grid, Button } from '@material-ui/core';

import { drawerWidth } from '../../../utils/consts.js';

import TablePlan from './TablePlan';
import FormArmarArreglo from './Form';

import PageHeader from '../../../components/PageHeader';
import { post, put } from '../../../helpers/fetch.js';
import { DialogSlide } from '../../../components/alert/DialogSlide.js';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(2),
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
    padding: '2rem',
  },
  btn: {
    marginRight: theme.spacing(1),
  },
  formControl: {
    minWidth: 222,
  },
  inputLabel: {},
}));

const Arreglos = () => {
  const classes = useStyles();
  const [productBodySelect, setProductBodySelect] = useState([]);
  const [errorServer, setErrorServer] = useState(false);
  const [isArmarPlanSuccess, setIsArmarPlanSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [getTypePlan, setGetTypePlan] = useState([]);
  const [getIdTypePlan, setGetIdTypePlan] = useState('');
  const [ProductPlan, setGetProductPlan] = useState([]);

  const handleClose = () => {
    setOpenDialog(false);
    setErrorServer(false);
    if (isArmarPlanSuccess) {
      setIsArmarPlanSuccess(false);
    }
  };

  const cleanForm = () => {
    setProductBodySelect([]);
    setGetIdTypePlan('');
    setGetProductPlan([]);
  };

  const handleSave = () => {
    const userData = {};

    const detalle = productBodySelect.map(
      ({ idProducto, cantidad, idUnidadMedida }) => ({
        idProducto,
        cantidad,
        idUnidadMedida,
      })
    );

    Object.assign(userData, { detalle }, { idTipoPlan: getIdTypePlan });

    if (ProductPlan.length) {
      return put('plan', userData)
        .then((res) => res.json())
        .then(({ data }) => {
          if (data) {
            setErrorServer(false);
            setIsArmarPlanSuccess(true);
            cleanForm();
          }
        })
        .catch((err) =>
          setErrorServer('Verifique que todos los campos esten correctos')
        )
        .finally(() => setOpenDialog(true));
    } else {
      return post('plan/add', userData)
        .then(async (response) => {
          if (response.status === 201) {
            setErrorServer(false);
            setIsArmarPlanSuccess(true);
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
    }
  };

  return (
    <div>
      <PageHeader
        className={classes.root}
        title="Armado de Arreglos"
        subTitle="Registrar, consultar y actualizar"
        icon={<Assessment fontSize="large" />}
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
            <FormArmarArreglo
              setProductBodySelect={setProductBodySelect}
              productBodySelect={productBodySelect}
              setGetTypePlan={setGetTypePlan}
              getTypePlan={getTypePlan}
              ProductPlan={ProductPlan}
              setGetProductPlan={setGetProductPlan}
              setGetIdTypePlan={setGetIdTypePlan}
              getIdTypePlan={getIdTypePlan}
            />
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TablePlan
                  setProductBodySelect={setProductBodySelect}
                  productBodySelect={productBodySelect}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {openDialog && (
        <DialogSlide
          handleClose={handleClose}
          openDialog={openDialog}
          title={
            !errorServer
              ? ProductPlan.length
                ? 'Armado de plan actualizado!'
                : 'Armado de plan completado!'
              : ProductPlan.length
              ? 'La Actualizacion del armado de plan no se pudo completar'
              : 'El armado de plan no se pudo completar'
          }
          body={
            !errorServer
              ? ProductPlan.length
                ? 'Su armado de plan se ha actualizado correctamente.'
                : `Su armado de plan se ha completado correctamente.`
              : `${
                  ProductPlan.length ? 'La  actualizacion' : 'El registro'
                } no se pudo completar. ${errorServer} `
          }
        />
      )}
    </div>
  );
};

export default Arreglos;
