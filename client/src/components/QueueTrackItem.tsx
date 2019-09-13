import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme, ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemAvatar } from '@material-ui/core';
import { Track } from '../types/playerTypes';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { PlayerDispatchContext } from './PlayallPlayer';
import Artwork from './Artwork';

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
    artwork: {
      marginRight: '10px',
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

  console.log(track.details.artwork);

  return (
    <ListItem
      button
      key={track.id}
      className={`${classes.root} ${classes.hover}`}
      selected={selected}
      onClick={playFromQueue}
    >
      {selected &&
      <ListItemAvatar className={classes.artwork}>
        <Artwork height={200} width={200} url={track.details.artwork.replace("large", "t300x300")} />
      </ListItemAvatar>}
      
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
