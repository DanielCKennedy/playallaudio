import React from 'react';
import { CssBaseline, Theme } from '@material-ui/core';
import { ThemeProvider, makeStyles, createStyles } from '@material-ui/styles';
import { darkTheme } from './theme';
import PlayallPlayer from './components/PlayallPlayer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';

const bottomBarHeight = 90;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    mainArea: {
      width: '100%',
      height: `calc(100% - ${bottomBarHeight}px)`,
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    bottomBar: {
      width: '100%',
      height: `${bottomBarHeight}px!important`,
      backgroundColor: 'white',
      position: "absolute",
      bottom: 0,
    },
  })
);

const SOUNDCLOUD_CLIENT_ID = process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID;

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <PlayallPlayer soundcloudClientId={SOUNDCLOUD_CLIENT_ID}>
        <Router>
          <div className={classes.app}>
            <div className={classes.mainArea}>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/search" component={SearchPage} />
            </div>
            <footer className={classes.bottomBar}>
            </footer>
          </div>
        </Router>
      </PlayallPlayer>
    </ThemeProvider>
  );
}

export default App;
