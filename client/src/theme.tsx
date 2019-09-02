import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const darkGray = '#292c33';
const darkerGray = '#141414';

export const darkTheme = responsiveFontSizes(createMuiTheme({
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
    },
    text: {
      primary: "#fff"
    }
  },
  typography: {
    fontFamily: "sans-serif",
    h1: {
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 500,
    },
  },
}));
