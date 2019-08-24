import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import ProgressTime from './ProgressTime';
import { TrackDetailsContext } from './PlayallPlayer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      textAlign: 'left',
      padding: '5px',
    },
    imgContainer: {

    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '5px',
    },
    titleContainer: {

    },
    artistContainer: {

    },
    timeContainer: {

    },
    artwork: {

    },
    artworkPlaceholder: {
      height: '60px',
      width: '60px',
      backgroundColor: 'black',
    },
  })
);

const NowPlaying: React.FC = () => {
  const classes = useStyles();
  const trackDetails = useContext(TrackDetailsContext);

  return (
    <div className={classes.root}>
      <div className={classes.imgContainer}>
        {
          trackDetails.artwork ?
          <img src={trackDetails.artwork} alt="artwork" className={classes.artwork} height="60px" width="60px" /> :
          <div className={classes.artworkPlaceholder} />
        }
      </div>
      <div className={classes.textContainer}>
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

export default NowPlaying;