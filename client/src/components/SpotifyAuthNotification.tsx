import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    }
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
      <button onClick={() => requestSpotifyAuth()}>Spotify Auth</button>
    </div>
  );
};

export default SpotifyAuthNotification;
