import React, { useState, useEffect } from "react";
import "date-fns";
import {
  Button,
  Typography,
  Grid,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { useForm } from "react-hook-form";

import { DialogSlide } from "../../../components/alert/DialogSlide";

import Form from "../../../components/Form";
import { get, put } from "../../../helpers/fetch";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
    textTransform: "none",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    minWidth: 135,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  checkBoxGroup: {
    marginTop: theme.spacing(3),
  },
  addBtn: {
    height: "100%",
  },
  form: {
    width: 500,
    margin: theme.spacing(2),
  },
}));

const FormUsuario = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const { register, errors, getValues, setValue, reset } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const fetchConfigSuplidor = async () => {
      await get("pedido/suplidor")
        .then((res) => res.json())
        .then(({ data }) => {
          if (data) {
            setValue("tiempoEntrega", "1");
            setValue("precio", "2");
          } else {
            setValue("tiempoEntrega", "2");
            setValue("precio", "1");
          }
        })
        .catch(() => {});
    };
    fetchConfigSuplidor();
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
    setErrorSubmit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = getValues();
    const { tiempoEntrega } = userData;

    return put("pedido/suplidor", {
      isRequerido: tiempoEntrega === "1" ? true : false,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if (data[0] === 1) {
          setErrorSubmit(false);
        }
      })
      .catch((err) => setErrorSubmit(err.message))
      .finally(() => setOpenDialog(true));
  };

  return (
    <Form className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h6">Suplidor por tiempo de entrega</Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            name="tiempoEntrega"
            label="Orden de prioridad"
            type="text"
            inputRef={register({
              required: true,
            })}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6">Suplidor por mejor precio</Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            name="precio"
            label="Orden de prioridad"
            type="text"
            inputRef={register({
              required: true,
            })}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <div style={{ marginTop: 20 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
              onClick={handleSubmit}
            >
              ACTUALIZAR
            </Button>
          </div>
        </Grid>
      </Grid>

      {openDialog && (
        <DialogSlide
          handleClose={handleClose}
          openDialog={openDialog}
          title={
            !errorSubmit
              ? "Datos Actualizados!"
              : "La Actualizacion no se pudo completar"
          }
          body={
            !errorSubmit
              ? "Su Actualizacion se ha completado correctamente."
              : `La  actualizacion no se pudo completar. ${errorSubmit} `
          }
        />
      )}
    </Form>
  );
};

export default FormUsuario;
