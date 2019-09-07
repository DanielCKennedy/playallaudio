import React from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import { TrackDetails } from '../types/playerTypes';
import TrackItem from './TrackItem';

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
  tracks: TrackDetails[],
}

const TrackList: React.FC<TrackListProps> = ({ title, tracks }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4" component="h3" color="textPrimary" gutterBottom>
        {title}
      </Typography>
      <div className={classes.listContainer}>
        <ul className={classes.list}>
          {tracks.map((track: TrackDetails) =>
            <li key={track.id}>
              <TrackItem trackDetails={track} />
            </li>)}
        </ul>
      </div>
    </div>
  );
}

export default TrackList;
