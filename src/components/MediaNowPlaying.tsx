import React, { useContext } from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import Artwork from './Artwork';
import { TrackDetailsContext } from './PlayallPlayer';
import ProgressTime from './ProgressTime';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
    },
    infoContainer: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '10px',
      overflow: 'hidden',
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

const MediaNowPlaying: React.FC = () => {
  const classes = useStyles();
  const trackDetails = useContext(TrackDetailsContext);

  return (
    <div className={classes.root}>
      <div className={classes.verticallyCenter}>
        <Artwork height={60} width={60} url={trackDetails.artwork} />
      </div>
      <div className={classes.infoContainer}>
        <Typography align="left" color="textPrimary" noWrap={true}>
          {trackDetails.title ? trackDetails.title : "--"}
        </Typography>
        <Typography align="left" color="textSecondary" noWrap={true}>
          {trackDetails.artists.length ? trackDetails.artists.join(", ") : "--"}
        </Typography>
        <Typography align="left" color="textPrimary" noWrap={true}>
          <ProgressTime />
        </Typography>
      </div>
    </div>
  );
};

export default MediaNowPlaying;