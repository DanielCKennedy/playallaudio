import React, { useEffect, useState, useRef } from 'react';
import { CssBaseline, Theme } from '@material-ui/core';
import { ThemeProvider, makeStyles, createStyles } from '@material-ui/styles';
import { darkTheme } from './theme';
import PlayallPlayer from './components/PlayallPlayer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import MediaBar from './components/MediaBar';
import QueuePage from './components/QueuePage';
import is from 'is_js';
import { StaticContext, RouteComponentProps } from 'react-router';
import ScrollToTop from './components/ScrollToTop';

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
      WebkitOverflowScrolling: 'touch',
    },
    bottomBar: {
      width: '100%',
      height: `${bottomBarHeight}px!important`,
      position: "fixed",
      bottom: 0,
      backgroundColor: '#13161a',
      zIndex: 2,
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
  const [isSpotifySupported, setSpotifySupport] = useState(false);
  const [isSoundcloudSupported, setSoundcloudSupport] = useState(true);
  const scrollablePage = useRef<HTMLDivElement>(null);

  const homePageRender = (route: RouteComponentProps<any, StaticContext, any>) => <HomePage {...route} spotifyToken={spotifyToken} spotifySupport={isSpotifySupported} soundcloudSupport={isSoundcloudSupported} />
  const searchPageRender = (route: RouteComponentProps<any, StaticContext, any>) => <SearchPage {...route} route={route} spotifyToken={spotifyToken} />

  useEffect(() => {
    if (is.not.safari() && is.not.mobile() && is.not.ipad()) {
      setSpotifySupport(true);

      const spotifyAccessToken = decodeSpotifyToken();
      if (spotifyAccessToken) {
        window.onSpotifyWebPlaybackSDKReady = () => {
          setSpotifyToken(spotifyAccessToken);
        }
        addSpotifySdkToDom();
      }
    }

    if (is.ios() && (is.mobile() || is.ipad())) {
      setSoundcloudSupport(false);
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <PlayallPlayer soundcloudClientId={SOUNDCLOUD_CLIENT_ID} spotifyAccessToken={spotifyToken}>
        <Router>
          <div className={classes.app}>
            <div className={classes.mainArea} ref={scrollablePage}>
              <ScrollToTop element={scrollablePage.current} />
              <Switch>
                <Route exact path="/" render={homePageRender} />
                <Route exact path="/queue" component={QueuePage} />
                <Route exact path="/search" render={searchPageRender} />
                <Route exact path="/search/:source/:id" render={searchPageRender} />
                <Route render={homePageRender} />
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
