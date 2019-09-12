import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Track } from '../types/playerTypes';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { PlayerDispatchContext } from './PlayallPlayer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderBottom: '1px solid white',
    },
    hover: {
      "&:hover": {
        backgroundColor: '#ffffff11',
      }
    },
    selected: {
      backgroundColor: '#ffffff11',
    },
  })
);

type QueueTrackItemProps = {
  track: Track,
  selected?: boolean,
}

const QueueTrackItem: React.FC<QueueTrackItemProps> = ({ track, selected }) => {
  const classes = useStyles();
  const playerDispatch = useContext(PlayerDispatchContext);

  const playFromQueue = () => {
    playerDispatch({ type: 'PLAY_FROM_QUEUE', track: track })
  }

  const removeFromQueue = () => {
    playerDispatch({ type: 'REMOVE_FROM_QUEUE', track: track });
  }

  return (
    <ListItem
      button
      key={track.id}
      className={`${classes.root} ${classes.hover}`}
      selected={selected}
      onClick={playFromQueue}
    >
      <ListItemText 
        primary={track.details.title}
        secondary={track.details.artists.join(", ")}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          className={classes.hover}
          color="secondary"
          onClick={removeFromQueue}
        >
          <CloseRoundedIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default QueueTrackItem;
