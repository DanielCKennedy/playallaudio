import React, { createRef } from 'react';
import { Typography, GridList, GridListTile, GridListTileBar, makeStyles, Theme, createStyles, Fab, IconButton } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import PlaylistPlayCard from './PlaylistPlayCard';
import QueueRoundedIcon from '@material-ui/icons/QueueRounded';

const height = 275;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    gridListContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      flex: 1,
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
      scrollBehavior: 'smooth',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      "&::-webkit-scrollbar": {
        display: 'none',
      },
    },
    
    img: {
      height: height,
      width: 'auto',
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftButton: {
      position: 'relative',
      right: '-20px',
      zIndex: 1,
    },
    rightButton: {
      position: 'relative',
      left: '-20px',
      zIndex: 1,
    },
    nameContainer: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
);

type PlaylistListProps = {
  name: string,
}

const PlaylistList: React.FC<PlaylistListProps> = ({ name }) => {
  const classes = useStyles();
  const ref = createRef<HTMLElement | null>();

  const scrollLeft = () => {
    const gridList = ref.current;
    if (gridList) {
      gridList.scrollLeft -= height;
    }
  };

  const scrollRight = () => {
    const gridList = ref.current;
    if (gridList) {
      gridList.scrollLeft += height;
    }
  };

  type PlaylistCard = {
    name: string,
    url: string,
  }

  const playlists: PlaylistCard[] = [
    {
      name: "Electric Dance Music In the head of the back",
      url: "https://i1.sndcdn.com/artworks-000181429431-0bjjfu-crop.jpg",
    },
    {
      name: "Rock",
      url: "https://i.scdn.co/image/95a1c501b5cc0cf7bdbccea4921c5d1684b7249c",
    },
    {
      name: "Deep House",
      url: "https://i.scdn.co/image/146a871aa25799b66a7bb4e9752daa85f7701435",
    },
    {
      name: "Classical",
      url: "https://i.scdn.co/image/c1afa01d2ae18e308931fdd2ead79e6bf3408609",
    },
    {
      name: "Tchami",
      url: "https://i.scdn.co/image/451afdf987b9a189fca88d16b5492c547528737e",
    },
    {
      name: "Dubstep",
      url: "https://i1.sndcdn.com/artworks-000187416940-d53jue-crop.jpg",
    },
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h3" color="textPrimary" gutterBottom>
        {name}
      </Typography>
      <div className={classes.container}>
        <Fab className={classes.leftButton} color="secondary" onClick={scrollLeft} size="medium" aria-label="scroll left">
          <ArrowBackIosRoundedIcon color="primary"/>
        </Fab>
        <div className={classes.gridListContainer}>
          <GridList className={classes.gridList} cellHeight={height} cols={0} ref={ref}>
            {playlists.map((playlist) => 
              <GridListTile>
                <PlaylistPlayCard name={playlist.name} url={playlist.url} height={height} />
                <GridListTileBar
                  title={
                    <Typography variant="h5">
                      <div className={classes.nameContainer}>
                        {playlist.name}
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
          </GridList>
        </div>
        <Fab className={classes.rightButton} color="secondary" onClick={scrollRight} size="medium" aria-label="scroll right">
          <ArrowForwardIosRoundedIcon color="primary"/>
        </Fab>
      </div>
    </div>
  );
};

export default PlaylistList;