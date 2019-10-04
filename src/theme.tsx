import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const darkGray = "#222930";
const darkerGray = '#13161a';

export const darkTheme = responsiveFontSizes(createMuiTheme({
  palette: {
    primary: {
      main: darkerGray,
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: darkGray,
      paper: darkerGray,
    },
    text: {
      primary: "#fff",
      secondary: "#888",
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
