import React, { useContext } from 'react';
import { makeStyles, Theme, createStyles, Typography, List } from '@material-ui/core';
import { Track } from '../types/playerTypes';
import TrackItem from './TrackItem';
import { PlayerDispatchContext } from './PlayallPlayer';
import { createQueue } from '../utils/queueUtils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listContainer: {
      borderTop: '1px solid white',
    },
  }),
);

type TrackListProps = {
  title: string,
  tracks: Track[],
}

const TrackList: React.FC<TrackListProps> = ({ title, tracks }) => {
  const classes = useStyles();
  const playerDispatch = useContext(PlayerDispatchContext);

  return (
    <React.Fragment>
      <Typography variant="h4" component="h3" color="textPrimary" gutterBottom>
        {title}
      </Typography>
      <List className={classes.listContainer}>
        {tracks.map((track: Track) =>
          <TrackItem
            key={track.id}
            track={track}
            onClick={() => playerDispatch({ type: 'SET_QUEUE', queue: createQueue(track, tracks)})}
          />)}
      </List>
    </React.Fragment>
  );
}

export default TrackList;
