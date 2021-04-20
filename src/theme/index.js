import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#630F5C',
      light: '#3c44b126',
    },
    secondary: {
      main: '#E21327',
      light: '#f8324526',
    },
    success: {
      main: '#51CD58',
    },
    progressBar: {
      main: '#fff',
      light: '#fff',
    },
    background: {
      default: '#f4f5fd',
    },
  },
  typography: {
    fontFamily: ['Roboto'],
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)',
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

export default theme;
