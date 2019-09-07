import React, { useContext } from 'react';
import { TrackDetails } from '../types/playerTypes';
import { makeStyles, Theme, createStyles, Typography, Button, IconButton } from '@material-ui/core';
import QueueRoundedIcon from '@material-ui/icons/QueueRounded';
import { PlayerDispatchContext } from './PlayallPlayer';
import { createTrack } from '../utils/trackUtils';

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
    artwork: (props: StyleProps) => ({
      width: '60px',
      height: '60px',
      backgroundImage: `url(${props.artwork})`,
      backgroundSize: 'cover!important',
      margin: '5px',
    }),
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

type StyleProps = {
  artwork: string,
}

const TrackItem: React.FC<TrackItemProps> = ({ trackDetails, onClick }) => {
  const classes = useStyles({
    artwork: trackDetails.artwork,
  });
  const playerDispatch = useContext(PlayerDispatchContext);
  
  return (
    <div className={classes.root}>
      <Button className={classes.flexGrow} onClick={onClick}>
        <div className={classes.verticallyCenter}>
          <div className={classes.artwork} />
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