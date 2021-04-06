import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

const Form = ({ children, ...other }) => {
  const classes = useStyles();

  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {children}
    </form>
  );
};

export default Form;
