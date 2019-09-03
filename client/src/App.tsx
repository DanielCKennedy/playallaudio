import React from 'react';
import { CssBaseline, Theme, Container } from '@material-ui/core';
import { ThemeProvider, makeStyles, createStyles } from '@material-ui/styles';
import { darkTheme } from './theme';
import PlayallPlayer from './components/PlayallPlayer';
import LandingHeader from './components/LandingHeader';
import HomeContent from './components/HomeContent';

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
        <div className={classes.app}>
          <div className={classes.mainArea}>
            <LandingHeader />
            <Container maxWidth="xl">
              <HomeContent />
            </Container>
          </div>
          <footer className={classes.bottomBar}>
          </footer>
        </div>
      </PlayallPlayer>
    </ThemeProvider>
  );
}

export default App;
