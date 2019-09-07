import React, { useContext } from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import { Track, Queue } from '../types/playerTypes';
import TrackItem from './TrackItem';
import { PlayerDispatchContext } from './PlayallPlayer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listContainer: {
      borderTop: '1px solid white',
    },
    list: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    }
  }),
);

type TrackListProps = {
  title: string,
  tracks: Track[],
}

const createQueue = (findTrack: Track, tracks: Track[]): Queue => {
  var prevQueue: Track[] = [];
  var nextQueue: Track[] = [];
  var track: Track | undefined = undefined;

  const index = tracks.indexOf(findTrack)
  
  if (index >= 0 && index < tracks.length) {
    prevQueue = tracks.slice(0, index);
    nextQueue = tracks.slice(index + 1, tracks.length);
    track = tracks[index];
  }

  return {
    track: track,
    prev: prevQueue,
    next: nextQueue,
  }
}

const TrackList: React.FC<TrackListProps> = ({ title, tracks }) => {
  const classes = useStyles();
  const playerDispatch = useContext(PlayerDispatchContext);

  return (
    <div>
      <Typography variant="h4" component="h3" color="textPrimary" gutterBottom>
        {title}
      </Typography>
      <div className={classes.listContainer}>
        <ul className={classes.list}>
          {tracks.map((track: Track) => 
            <li key={track.id}>
              <TrackItem
                trackDetails={track.details}
                onClick={() => playerDispatch({ type: 'SET_QUEUE', queue: createQueue(track, tracks)})} />
            </li>)}
        </ul>
      </div>
    </div>
  );
}

export default TrackList;
