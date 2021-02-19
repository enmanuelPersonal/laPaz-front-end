import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#227FFC' },
    secondary: { main: '#3d6d8c' },
    toggleButtonBackground: { main: '#194b85' },
    toggleButtonColor: { main: '#fff' },
  },
  typography: { fontFamily: 'Open Sans' },
  h1: { fontFamily: 'Open Sans Condensed' },
  h2: { fontFamily: 'Open Sans Condensed' },
  h3: { fontFamily: 'Open Sans Condensed' },
  h4: { fontFamily: 'Open Sans Condensed' },
  h5: { fontFamily: 'Open Sans Condensed' },
  h6: { fontFamily: 'Open Sans Condensed' },
});

theme.overrides.MuiToggleButton = {
  // Override the styling for selected toggle buttons
  root: {
    '&$selected': {
      backgroundColor: theme.palette.toggleButtonBackground.main,
      color: theme.palette.toggleButtonColor.main,
    },
  },
};

export default theme;
