import React, { useContext } from 'react';
import { List, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Track } from '../types/playerTypes';
import QueueTrackItem from './QueueTrackItem';
import { QueueContext } from './PlayallPlayer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderTop: '1px solid white',
    }
  }),
);

const QueueList: React.FC = () => {
  const classes = useStyles();
  const queue = useContext(QueueContext);

  return (
    <List className={classes.root}>
      {queue.prev.slice(0).reverse().map((track: Track) =>
        <QueueTrackItem track={track} key={track.id} />)}
      {queue.track &&
      <QueueTrackItem track={queue.track} key={queue.track.id} selected />}
      {queue.next.map((track: Track) =>
        <QueueTrackItem track={track} key={track.id} />)}
    </List>
  );
};

export default QueueList;