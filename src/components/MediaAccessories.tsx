import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme, Tooltip, IconButton } from '@material-ui/core';
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
    hover: {
      "&:hover": {
        backgroundColor: '#ffffff11',
      }
    },
  })
);

const MediaAccessories: React.FC = () => {
  const classes = useStyles();
  const trackDetails = useContext(TrackDetailsContext);

  return (
    <div className={`${classes.root} ${classes.verticallyCenter}`}>
      {trackDetails.source === TrackSource.SOUNDCLOUD &&
      <Tooltip title="Go to Soundcloud" placement="top">
        <a href={trackDetails.externalUrl} target="_blank" rel="noopener noreferrer">
          <IconButton color="secondary" className={classes.hover} title="Go to Soundcloud">
            <img src={require("../assets/logo_big_white-soundcloud.png")} height={35} alt="soundcloud" />
          </IconButton>
        </a>
      </Tooltip>}
      {trackDetails.source === TrackSource.SPOTIFY &&
      <Tooltip title="Go to Spotify" placement="top">
        <a href={trackDetails.externalUrl} target="_blank" rel="noopener noreferrer">
          <IconButton color="secondary" className={classes.hover} title="Go to Spotify">
            <img src={require("../assets/Spotify_Icon_RGB_White.png")} height={35} alt="spotify" />
          </IconButton>
        </a>
      </Tooltip>}
    </div>
  );
};

export default MediaAccessories;
