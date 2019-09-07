import React from 'react';
import { Typography, GridListTile, GridListTileBar, makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import PlaylistPlayCard from './PlaylistPlayCard';
import QueueRoundedIcon from '@material-ui/icons/QueueRounded';
import HorizontalList from './HorizontalList';

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
}

const PlaylistList: React.FC<PlaylistListProps> = ({ title }) => {
  const classes = useStyles();

  type PlaylistCard = {
    title: string,
    url: string,
  }

  const playlists: PlaylistCard[] = [
    {
      title: "Electric Dance Music In the head of the back",
      url: "https://i1.sndcdn.com/artworks-000181429431-0bjjfu-crop.jpg",
    },
    {
      title: "Rock",
      url: "https://i.scdn.co/image/95a1c501b5cc0cf7bdbccea4921c5d1684b7249c",
    },
    {
      title: "Deep House",
      url: "https://i.scdn.co/image/146a871aa25799b66a7bb4e9752daa85f7701435",
    },
    {
      title: "Classical",
      url: "https://i.scdn.co/image/c1afa01d2ae18e308931fdd2ead79e6bf3408609",
    },
    {
      title: "Tchami",
      url: "https://i.scdn.co/image/451afdf987b9a189fca88d16b5492c547528737e",
    },
    {
      title: "Dubstep",
      url: "https://i1.sndcdn.com/artworks-000187416940-d53jue-crop.jpg",
    },
  ];

  return (
    <HorizontalList
      title={title}
      items={playlists.map((playlist) =>
        <GridListTile key={playlist.title}>
          <PlaylistPlayCard title={playlist.title} url={playlist.url} height={height} />
          <GridListTileBar
            title={
              <Typography variant="h5">
                <div className={classes.nameContainer}>
                  {playlist.title}
                </div>
              </Typography>
            }
            actionIcon={
              <IconButton aria-label="Add to queue" color="secondary">
                <QueueRoundedIcon />
              </IconButton>
            }/>
        </GridListTile>
        )}
    />
  );
};

export default PlaylistList;