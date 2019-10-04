import React, { useContext } from 'react';
import { Track, TrackSource } from '../types/playerTypes';
import { makeStyles, Theme, createStyles, IconButton, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Tooltip } from '@material-ui/core';
import QueueRoundedIcon from '@material-ui/icons/QueueRounded';
import { PlayerDispatchContext, TrackDetailsContext } from './PlayallPlayer';
import { recreateTrack } from '../utils/trackUtils';
import Artwork from './Artwork';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    artwork: {
      marginRight: '10px',
    },
    underline: {
      borderBottom: '1px solid white',
    },
    hover: {
      "&:hover": {
        backgroundColor: '#ffffff11',
      }
    },
    secondary: {
      alignItems: 'center',
      width: '100%',
      display: 'flex',
    },
    spotifyImg: {
      position: 'relative',
      left: -6,
    }
  }),
);

type TrackItemProps = {
  track: Track,
  onClick: () => void,
}

const TrackItem: React.FC<TrackItemProps> = ({ track, onClick }) => {
  const classes = useStyles();
  const playerDispatch = useContext(PlayerDispatchContext);
  const trackDetails = useContext(TrackDetailsContext);

  const addToQueue = () => {
    playerDispatch({ type: 'ADD_TO_QUEUE', track: recreateTrack(track) });
  }

  return (
    <ListItem
      key={track.id}
      button
      className={`${classes.underline} ${classes.hover}`}
      onClick={onClick}
      selected={trackDetails === track.details}
    >
      <ListItemAvatar className={classes.artwork}>
        <Artwork height={60} width={60} url={track.details.artwork} />
      </ListItemAvatar>
      <ListItemText primary={track.details.title} secondary={track.details.artists.join(", ")} />
      <ListItemSecondaryAction>
        <div className={classes.secondary}>
          {track.details.source === TrackSource.SOUNDCLOUD && <img src={require("../assets/logo_big_white-soundcloud.png")} height={25} alt="soundcloud"/>}
          {track.details.source === TrackSource.SPOTIFY && <img className={classes.spotifyImg} src={require("../assets/Spotify_Icon_RGB_White.png")} height={25} alt="spotify"/>}
          <Tooltip title="Add to queue" placement="top">
            <IconButton aria-label="Add to queue" color="secondary" className={classes.hover} onClick={addToQueue}>
              <QueueRoundedIcon />
            </IconButton>
          </Tooltip>
        </div>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TrackItem;
