import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { TrackDetailsContext } from './PlayallPlayer';
import { TrackSource } from '../types/playerTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'flex-end',
    },
    verticallyCenter: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  })
);

const MediaAccessories: React.FC = () => {
  const classes = useStyles();
  const trackDetails = useContext(TrackDetailsContext);

  return (
    <div className={`${classes.root} ${classes.verticallyCenter}`}>
      {trackDetails.source === TrackSource.SOUNDCLOUD &&
      <a href={trackDetails.externalUrl} target="_blank" rel="noopener noreferrer">
        <img src={require("../assets/logo_big_white-soundcloud.png")} height={35} alt="soundcloud" />
      </a>}
      {trackDetails.source === TrackSource.SPOTIFY &&
      <a href={trackDetails.externalUrl} target="_blank" rel="noopener noreferrer">
        <img src={require("../assets/Spotify_Icon_RGB_White.png")} height={35} alt="spotify" />
      </a>}
    </div>
  );
};

export default MediaAccessories;
