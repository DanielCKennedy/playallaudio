import React, { useContext } from 'react';
import { Typography, GridListTile, GridListTileBar, makeStyles, Theme, createStyles } from '@material-ui/core';
import PlaylistPlayCard from './PlaylistPlayCard';
// import QueueRoundedIcon from '@material-ui/icons/QueueRounded';
import HorizontalList from './HorizontalList';
import { Track, TrackSource } from '../types/playerTypes';
import { PlayerDispatchContext } from './PlayallPlayer';
import { createQueue } from '../utils/queueUtils';
import { featuredPlaylists } from '../constants/playlistConstants';
import { Link } from 'react-router-dom';

const height = 275;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      height: height,
      width: 'auto',
    },
    nameContainer: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
);

type PlaylistListProps = {
  title: string,
  spotifyToken: string,
}

export type PlaylistCard = {
  title: string,
  url: string,
  tracks: Track[],
}

const PlaylistList: React.FC<PlaylistListProps> = ({ title, spotifyToken }) => {
  const classes = useStyles();
  const playerDispatch = useContext(PlayerDispatchContext);

  return (
    <HorizontalList
      title={title}
      items={featuredPlaylists.map((playlist) =>
        <GridListTile key={playlist.title} onClick={() => playerDispatch({ type: 'SET_QUEUE', queue: createQueue(playlist.tracks[0], playlist.tracks.filter(t => spotifyToken ? true : t.details.source !== TrackSource.SPOTIFY)) })}>
          <Link to="/queue">
            <PlaylistPlayCard title={playlist.title} url={playlist.url} height={height} />
            <GridListTileBar
              title={
                <Typography variant="h5">
                  <div className={classes.nameContainer}>
                    {playlist.title}
                  </div>
                </Typography>
              }
            // actionIcon={
            //   <IconButton aria-label="Add to queue" color="secondary">
            //     <QueueRoundedIcon />
            //   </IconButton>
            // }
            />
          </Link>
        </GridListTile>
      )}
    />
  );
};

export default PlaylistList;