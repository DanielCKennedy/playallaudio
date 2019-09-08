import React, { useContext } from 'react';
import { TrackDetails } from '../types/playerTypes';
import { makeStyles, Theme, createStyles, Typography, Button, IconButton } from '@material-ui/core';
import QueueRoundedIcon from '@material-ui/icons/QueueRounded';
import { PlayerDispatchContext } from './PlayallPlayer';
import { createTrack } from '../utils/trackUtils';
import Artwork from './Artwork';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      height: '80px',
      width: '100%',
      borderBottom: '1px solid white',
    },
    flexGrow: {
      flexGrow: 1,
    },
    text: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'left',
    },
    verticallyCenter: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    artwork: {
      marginRight: '10px',
      marginBottom: '5px',
    },
    accessoryContainer: {
      display: 'flex',
      flexDirection: 'row-reverse',
    },
  }),
);

type TrackItemProps = {
  trackDetails: TrackDetails,
  onClick: () => void,
}

const TrackItem: React.FC<TrackItemProps> = ({ trackDetails, onClick }) => {
  const classes = useStyles();
  const playerDispatch = useContext(PlayerDispatchContext);
  
  return (
    <div className={classes.root}>
      <Button className={classes.flexGrow} onClick={onClick}>
        <div className={`${classes.verticallyCenter} ${classes.artwork}`}>
          <Artwork height={60} width={60} url={trackDetails.artwork} />
        </div>
        <div className={`${classes.verticallyCenter} ${classes.text} ${classes.flexGrow}`}>
          <Typography color="secondary">
            {trackDetails.title}
          </Typography>
          <Typography color="secondary">
            {trackDetails.artists.join(', ')}
          </Typography>
          <Typography color="secondary">
            {trackDetails.duration}
          </Typography>
        </div>
      </Button>
      <div className={classes.accessoryContainer}>
        <IconButton aria-label="Add to queue" color="secondary" onClick={() => playerDispatch({ type: 'ADD_TO_QUEUE', track: createTrack(trackDetails) })}>
          <QueueRoundedIcon />
        </IconButton>        
      </div>
    </div>
  );
};

export default TrackItem;