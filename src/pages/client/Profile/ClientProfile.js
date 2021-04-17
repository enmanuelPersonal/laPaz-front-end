import {
  Card,
  Container,
  Avatar,
  Grid,
  Divider,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  cardProfile: { marginTop: "10%", padding: "5%" },
  containerData: { textAlign: "center", justifyContent: "left" },
  avatar: { width: "27%", height: "4em", margin: "auto" },
  verticalLine: {
    height: "15em",
    [theme.breakpoints.down(826)]: {
      display: "none",
    },
  },
  containerAvatarAndName: {
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down(826)]: {
      marginBottom: "2%",
    },
  },
  containerUserInformation: {
    [theme.breakpoints.down(826)]: {
      margin: "auto",
    },
  },
  dataUp:{ display: "flex", marginLeft: "5%", width: "25em" },
  labelDataUp:{ fontSize: "13px", width: "10em", textAlign: "left" },
  textDataUp:{ marginTop: "2%", fontSize: "13px" },
  dividerH:{ width: "100%" , marginTop:'2%', marginBottom:'2%'},
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

export const ClientProfile = () => {
  const classes = useStyles();
  return (
    <Container>
      <Card container className={classes.cardProfile}>
        <Grid container className={classes.containerData}>
          <div className={classes.containerAvatarAndName}>
            <Avatar className={classes.avatar} src="/broken-image.jpg" />
            <Typography style={{ marginTop: "3%", fontSize: "13px" }}>
              Enmanuel Estrella
            </Typography>
          </div>
          <Divider
            className={classes.verticalLine}
            orientation="vertical"
            flexItem
          />

          <Grid className={classes.containerUserInformation}>
            {userData.map((e) => (
              <div className={classes.dataUp}>
                <h1
                  className={classes.labelDataUp}
                >
                  {e.label}:
                </h1>
                <Typography className={classes.textDataUp}>
                  {e.text}
                </Typography>
              </div>
            ))}
            <Divider className={classes.dividerH} />
            {/* {userSuscriptionData.map((e) => ( */}
            <>
              <div style={{ display: "flex", marginLeft: "5%", width: "25em" }}>
                <h1 style={{ fontSize: "13px", textAlign: "left" }}>Plan:</h1>
                <Typography
                  style={{
                    marginTop: "2%",
                    marginLeft: "3%",
                    fontSize: "13px",
                  }}
                >
                  Primium
                </Typography>

                <h1
                  style={{
                    fontSize: "13px",
                    marginLeft: "5%",
                    textAlign: "left",
                  }}
                >
                  Monto cuota:
                </h1>
                <Typography
                  style={{
                    marginTop: "2%",
                    marginLeft: "3%",
                    fontSize: "13px",
                  }}
                >
                  $ 000
                </Typography>
              </div>
              <div style={{ display: "flex", marginLeft: "5%", width: "25em" }}>
                <h1 style={{ fontSize: "13px", textAlign: "left" }}>Estado:</h1>
                <Typography
                  style={{
                    marginTop: "2%",
                    marginLeft: "3%",
                    fontSize: "13px",
                  }}
                >
                  Activo
                </Typography>

                <h1
                  style={{
                    fontSize: "13px",
                    marginLeft: "5%",
                    textAlign: "left",
                  }}
                >
                  Monto suscripción:
                </h1>
                <Typography
                  style={{
                    marginTop: "2%",
                    marginLeft: "3%",
                    fontSize: "13px",
                  }}
                >
                  $ 000
                </Typography>
              </div>
            </>
            {/* ))} */}
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};
