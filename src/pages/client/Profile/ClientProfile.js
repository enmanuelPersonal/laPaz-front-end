import {
  Card,
  Container,
  Avatar,
  Grid,
  Divider,
  Typography,
  AppBar,
  Tab,
  Tabs,
  Box,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  cardProfile: { marginTop: "10%", padding: "5%" },
  containerData: {
    width: "80%",
    [theme.breakpoints.down(1020)]: {
      margin: "auto",
    },
  },
  avatar: { width: "27%", height: "4em", margin: "auto",
  [theme.breakpoints.up(500)]: {
     width:'30%'
   }},
  verticalLine: {
    height: "15em",
    [theme.breakpoints.down(1020)]: {
      display: "none",
    },
  },
  containerAvatarAndName: {
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down(1020)]: {
      marginBottom: "2%",
    },
  },
  containerUserInformation: {
    [theme.breakpoints.down(1020)]: {
      margin: "auto",
    },
  },
  data: {
    marginLeft: "0",

    [theme.breakpoints.up(500)]: {
      display: "flex",
      marginLeft: "5%",
    },
  },
  labelDataUp: { fontSize: "14px", width: "10em", textAlign: "left" },
  textDataUp: { marginTop: "2%", fontSize: "14px" },
  dividerH: { width: "100%", marginTop: "2%", marginBottom: "2%" },
  textTab: {
    fontSize: "13px",
    [theme.breakpoints.down(400)]: {
      fontSize: "10px",
    },
  },
  name: { marginTop: "8%", fontSize: "15px", marginBottom: "2%" },
  labelLeftDataDown: { fontSize: "13px", textAlign: "left" },
  labelRightDataDown: {
    fontSize: "14px",
    marginLeft: "5%",
    textAlign: "left",
    [theme.breakpoints.down(500)]: {
      marginLeft: "0",
    },
  },
  componentDataDown: {
    width: "25em",
    [theme.breakpoints.up(500)]: {
      display: "flex",
      marginLeft: "5%",
    },
  },
  textRightDataDown: {
    marginTop: "2%",
    marginLeft: "3%",
    fontSize: "14px",
    [theme.breakpoints.down(500)]: {
      marginLeft: "0",
    },
  },
  titleSuscription:{
       fontSize:'16px',
       marginLeft:'5%',
       [theme.breakpoints.down(500)]: {
          marginLeft: "0",
        },
  }
}));

const userData = [
  {
    label: "Email",
    text: "nombre1@gmail.com",
  },
  {
    label: "Teléfono",
    text: "000-000-0000",
  },
  {
    label: "Fecha de nacimiento",
    text: "00/00/0000",
  },
  {
    label: "Nombre de usuario",
    text: "Nombre",
  },
];
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ClientProfile = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Card container className={classes.cardProfile}>
        <Grid container className={classes.containerData}>
          <div className={classes.containerAvatarAndName}>
            <Avatar className={classes.avatar} src="/broken-image.jpg" />
            <Typography className={classes.name}>Enmanuel Estrella</Typography>
          </div>
          <Divider
            className={classes.verticalLine}
            orientation="vertical"
            flexItem
          />

          <Grid className={classes.containerUserInformation}>
            {userData.map((e) => (
              <div className={classes.data}>
                <h1 className={classes.labelDataUp}>{e.label}:</h1>
                <Typography className={classes.textDataUp}>{e.text}</Typography>
              </div>
            ))}
            <Divider className={classes.dividerH} />
            <>
              <h1 className={classes.titleSuscription}>
                  Suscripción
                </h1>
              <div className={classes.componentDataDown}>
                <h1 className={classes.labelLeftDataDown}>Plan:</h1>
                <Typography className={classes.textRightDataDown}>
                  Primium
                </Typography>

                <h1 className={classes.labelRightDataDown}>Monto cuota:</h1>
                <Typography className={classes.textRightDataDown}>
                  $ 000
                </Typography>
              </div>
              <div className={classes.data}>
                <h1 className={classes.labelLeftDataDown}>Estado:</h1>
                <Typography className={classes.textRightDataDown}>
                  Activo
                </Typography>

                <h1 className={classes.labelRightDataDown}>
                  Monto suscripción:
                </h1>
                <Typography className={classes.textRightDataDown}>
                  $ 000
                </Typography>
              </div>
            </>
          </Grid>
        </Grid>
        <div style={{ marginTop: "3%" }}>
          <Paper>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="scrollable auto tabs example"
            >
              <Tab
                label="Mensualidad"
                className={classes.textTab}
                {...a11yProps(0)}
              />
              <Tab
                label="Parientes"
                className={classes.textTab}
                {...a11yProps(1)}
              />
              <Tab
                label="Compras"
                className={classes.textTab}
                {...a11yProps(2)}
              />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            Mensualidad
          </TabPanel>
          <TabPanel value={value} index={1}>
            Parientes
          </TabPanel>
          <TabPanel value={value} index={2}>
            Compras
          </TabPanel>
        </div>
      </Card>
    </Container>
  );
};
