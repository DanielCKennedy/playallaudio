import React from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      border: '8px solid #fc466b',
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
    img: {
      margin: '0px 10px',
    }
  })
);

const SpotifyBrowserSupportNotification: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.verticallyCenter}>
        <img src={require("../assets/Spotify_Icon_RGB_White.png")} height={55} alt="spotify" className={classes.img} />
      </div>
      <div className={classes.verticallyCenter}>
        <Typography color="secondary" variant="h6">
          Spotify playback is not supported on mobile browsers or Safari.
        </Typography>
      </div>
    </div>
  );
};

export default SpotifyBrowserSupportNotification;
