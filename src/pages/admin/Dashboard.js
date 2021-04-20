import React, { useEffect, useState } from 'react';
import { makeStyles, Box, Grid, Paper } from '@material-ui/core';
import { ViewQuilt, HowToReg } from '@material-ui/icons';

import PageHeader from '../../components/PageHeader';
import { drawerWidth } from '../../utils/consts.js';
import { get } from '../../helpers/fetch';
import IngresosDay from './dasboard/IngresosDay';
import IngresoMes from './dasboard/IgresoMes';

const useStyles = makeStyles((theme) => ({
  containerTable: {
    marginLeft: drawerWidth + 15,
    marginRight: 15,
    borderRadius: 10,
    padding: '1rem',
  },
  paper: {
    backgroundColor: 'white',
    textAlign: 'center',
    padding: theme.spacing(5),
  },
  icon: {
    width: 100,
  },
  iconPaper: {
    color: '#88187F',
    fontSize: 39,
  },
  numberPaper: {
    color: '#88187F',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [totalIngresos, setTotalIngresos] = useState(0.0);
  const [totalParientes, setTotalParientes] = useState(0);
  const [totalSuscripcion, setTotalSuscripcion] = useState(0);
  const [totalVentaMes, setTotalVentaMes] = useState(0.0);

  useEffect(() => {
    const fetchTotalIngresos = async () => {
      await get('dasboard/ingresos')
        .then((res) => res.json())
        .then(({ data }) => setTotalIngresos(data))
        .catch(() => {});
    };
    const fetchTotalParientes = async () => {
      await get('dasboard/pariente')
        .then((res) => res.json())
        .then(({ data }) => setTotalParientes(data))
        .catch(() => {});
    };
    const fetchTotalSuscripcion = async () => {
      await get('dasboard/suscripcion')
        .then((res) => res.json())
        .then(({ data }) => setTotalSuscripcion(data))
        .catch(() => {});
    };
    const fetchTotalVentaMes = async () => {
      await get('dasboard/mes')
        .then((res) => res.json())
        .then(({ data }) => setTotalVentaMes(data))
        .catch(() => {});
    };
    fetchTotalIngresos();
    fetchTotalParientes();
    fetchTotalSuscripcion();
    fetchTotalVentaMes();

    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <PageHeader
        className={classes.root}
        title="Dashboard"
        subTitle="Panel de Administración"
        icon={<ViewQuilt fontSize="large" />}
      />
      <Box
        justifyContent="center"
        display="flex"
        className={classes.containerTable}
      >
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    fontSize={22}
                    fontWeight="bold"
                    mb={1}
                    className={classes.numberPaper}
                  >
                    {totalIngresos}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    fontWeight={200}
                    fontFamily="Sans-serif"
                    letterSpacing={1}
                  >
                    Total Ingresos
                  </Box>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Box>
                        <HowToReg
                          fontSize="large"
                          className={classes.iconPaper}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    fontSize={22}
                    fontWeight="bold"
                    mb={1}
                    className={classes.numberPaper}
                  >
                    {totalSuscripcion}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    fontWeight={200}
                    fontFamily="Sans-serif"
                    letterSpacing={1}
                  >
                    Suscripciones
                  </Box>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Box>
                        <HowToReg
                          fontSize="large"
                          className={classes.iconPaper}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    fontSize={22}
                    fontWeight="bold"
                    mb={1}
                    className={classes.numberPaper}
                  >
                    {totalParientes}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    fontWeight={200}
                    fontFamily="Sans-serif"
                    letterSpacing={1}
                  >
                    Parientes
                  </Box>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Box>
                        <HowToReg
                          fontSize="large"
                          className={classes.iconPaper}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    fontSize={22}
                    fontWeight="bold"
                    mb={1}
                    className={classes.numberPaper}
                  >
                    {totalVentaMes}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    fontWeight={200}
                    fontFamily="Sans-serif"
                    letterSpacing={1}
                  >
                    Ventas del Mes
                  </Box>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Box>
                        <HowToReg
                          fontSize="large"
                          className={classes.iconPaper}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box
        justifyContent="center"
        display="flex"
        className={classes.containerTable}
      >

            <Grid item lg={8} md={6} xl={9} xs={12}>
              <IngresosDay 
              />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12} style={{marginLeft: 5}}>
              <IngresoMes
              />
            </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
