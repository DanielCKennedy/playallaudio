import React, { useState } from 'react';
import { Card, CardActionArea, makeStyles, Theme, createStyles, CardMedia } from '@material-ui/core';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mediaContainer: {
      position: 'relative',
    },
    playIcon: {
      position: 'absolute',
      color: 'white',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
      zIndex: 2,
      height: 75,
      width: 75,
      display: 'block',
    },
    card: {
      objectFit: 'cover',
    },
  }),
);

type PlaylistPlayCardProps = {
  height: string | number,
  url: string,
  title: string,
}

const PlaylistPlayCard: React.FC<PlaylistPlayCardProps> = ({ height, url, title }) => {
  const classes = useStyles();
  const [showPlay, setShowPlay] = useState(false);
  
  return (
    <Card className={classes.card}>
      <CardActionArea onMouseEnter={() => {setShowPlay(true)}} onMouseLeave={() => {setShowPlay(false)}}>
        <div className={classes.mediaContainer}>
          {showPlay && <PlayArrowRoundedIcon className={classes.playIcon} />}
          <CardMedia component="img" image={url} title={title} alt={title} height={height} />
        </div>
      </CardActionArea>
    </Card>
  );
};

export default PlaylistPlayCard;