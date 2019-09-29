import React, { useEffect, useState } from 'react';
import { CssBaseline, Theme } from '@material-ui/core';
import { ThemeProvider, makeStyles, createStyles } from '@material-ui/styles';
import { darkTheme } from './theme';
import PlayallPlayer from './components/PlayallPlayer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import MediaBar from './components/MediaBar';
import QueuePage from './components/QueuePage';

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
      position: "absolute",
      bottom: 0,
    },
  })
);

const SOUNDCLOUD_CLIENT_ID = process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID;

const getHashParams = (): any => {
  let hashParams: any = {};
  let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

const decodeSpotifyToken = (): string => {
  const hashParams = getHashParams();
  if (hashParams.spotify_access_token) {
    return hashParams.spotify_access_token;
  }
  return "";
}

const addSpotifySdkToDom = () => {
  const spotifyScript: HTMLScriptElement = document.createElement('script');
    spotifyScript.id = 'spotify-script';
    spotifyScript.type = 'text/javascript';
    spotifyScript.async = false;
    spotifyScript.defer = false;
    spotifyScript.src = 'https://sdk.scdn.co/spotify-player.js';

    document.head.appendChild(spotifyScript);
};

const App: React.FC = () => {
  const classes = useStyles();
  const [spotifyToken, setSpotifyToken] = useState("");

  useEffect(() => {
    const spotifyAccessToken = decodeSpotifyToken();
    if (spotifyAccessToken) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        setSpotifyToken(spotifyAccessToken);
      }
      addSpotifySdkToDom();
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <PlayallPlayer soundcloudClientId={SOUNDCLOUD_CLIENT_ID} spotifyAccessToken={spotifyToken}>
        <Router>
          <div className={classes.app}>
            <div className={classes.mainArea}>
              <Switch>
                <Route 
                  exact
                  path="/"
                  render={(route) => <HomePage {...route} spotifyToken={spotifyToken} />}
                />
                <Route exact path="/queue" component={QueuePage} />
                <Route
                  exact
                  path="/search"
                  render={(route) => <SearchPage {...route} route={route} spotifyToken={spotifyToken} />}
                />
                <Route
                  exact
                  path="/search/:source/:id"
                  render={(route) => <SearchPage {...route} route={route} spotifyToken={spotifyToken} />}
                />
                <Route component={HomePage} />
              </Switch>
            </div>
            <footer className={classes.bottomBar}>
              <MediaBar />
            </footer>
          </div>
        </Router>
      </PlayallPlayer>
    </ThemeProvider>
  );
}

export default App;
