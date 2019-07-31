import React from 'react';
import logo from './logo.svg';
import { createMuiTheme, CssBaseline, Theme } from '@material-ui/core';
import { ThemeProvider, makeStyles, createStyles } from '@material-ui/styles';

const darkGray = '#292c33';
const darkerGray = '#141414';

const theme = createMuiTheme({
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    App: {
      textAlign: 'center',
    },
    AppLogo: {
      animation: '$AppLogoSpin infinite 20s linear',
      height: '40vmin',
      pointerEvents: 'none',
    },
    AppHeader: {
      backgroundColor: '#282c34',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
    },
    AppLink: {
      color: '#61dafb',
    },
    '@keyframes AppLogoSpin': {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.App}>
        <header className={classes.AppHeader}>
          <img src={logo} className={classes.AppLogo} alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className={classes.AppLink}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
