import React from 'react';
import { makeStyles, Box, Grid, Paper } from '@material-ui/core';
import { ViewQuilt, HowToReg } from '@material-ui/icons';

import PageHeader from '../../components/PageHeader';
import { drawerWidth } from '../../utils/consts.js';

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
                    50,000,000,000
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
                    50,000,000,000
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
                    50,000,000,000
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
                    50,000,000,000
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
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
