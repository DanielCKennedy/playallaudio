import React from 'react';
import { makeStyles, createStyles, Theme, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      border: '8px solid #1db954',
      borderRadius: 20,
      padding: "0px 10px",
      display: 'flex',
      flexDirection: 'row',
    },
    verticallyCenter: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      minHeight: '100px',
      textAlign: 'center',
      margin: 5,
    },
  })
);

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CALLBACK = "http://localhost:5000/spotify/callback";

function requestSpotifyAuth() {
  console.log("Requesting Spotify Auth");
  const scopes = [
    "streaming",            // Control playback of Spotify track (premium required)
    "user-read-birthdate",  // Get user's profile
    "user-read-email",      // Get user's profile
    "user-read-private",    // Get user's profile
    "user-library-read",    // Read user's "Your Music" library
    "user-modify-playback-state", // modify state
    "user-read-playback-state", // see playback state
    "user-read-currently-playing", // read currently playing track
  ];
  const href = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    `&client_id=${SPOTIFY_CLIENT_ID}` +
    `&scope=${encodeURIComponent(scopes.join(" "))}` +
    `&redirect_uri=${encodeURIComponent(SPOTIFY_CALLBACK)}` +
    '&show_dialog=true';
  console.log(href);
  window.location.href = href;
}

const SpotifyAuthNotification: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.verticallyCenter}>
        <img src={require("../assets/Spotify_Icon_RGB_Green.png")} height={55} alt="spotify" />
      </div>
      <div className={classes.verticallyCenter}>
        <Button variant="outlined" color="secondary" onClick={() => requestSpotifyAuth()}>
          Log in
        </Button>
      </div>
      <div className={classes.verticallyCenter}>
        <Typography color="secondary" variant="h6">
          Authenticate with a Spotify Premium account to gain access to music from Spotify
        </Typography>
      </div>
    </div>
  );
};

export default SpotifyAuthNotification;
