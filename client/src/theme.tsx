import { createMuiTheme } from '@material-ui/core/styles';

const darkGray = '#292c33';
const darkerGray = '#141414';

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: darkGray,
      dark: darkerGray,
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: darkGray,
      paper: darkGray,
    }
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
  },
});
