import React, { useContext } from 'react';
import { IconButton, makeStyles, createStyles, Theme } from '@material-ui/core';
import PlayCircleOutlineRounded from '@material-ui/icons/PlayCircleOutlineRounded';
import PauseCircleOutlineRounded from '@material-ui/icons/PauseCircleOutlineRounded';
import SkipPreviousRounded from '@material-ui/icons/SkipPreviousRounded';
import Replay10Rounded from '@material-ui/icons/Replay10Rounded';
import Forward30Rounded from '@material-ui/icons/Forward30Rounded';
import SkipNextRounded from '@material-ui/icons/SkipNextRounded';
import { ControlStateContext, PlayerDispatchContext } from './PlayallPlayer';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      justifyContent: 'center',
      verticalAlign: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
    },
    icon: {
      height: '35px',
      width: '35px',
    },
    bigIcon: {
      height: '45px',
      width: '45px',
    }
  }),
);

const MediaControls: React.FC = () => {
  const classes = useStyles();
  const controlState = useContext(ControlStateContext);
  const playerDispatch = useContext(PlayerDispatchContext);

  const play = () => {
    playerDispatch({
      type: 'PLAY'
    });
  };

  const pause = () => {
    playerDispatch({
      type: 'PAUSE'
    });
  };

  const next = () => {
    playerDispatch({
      type: 'NEXT'
    });
  };

  const prev = () => {
    playerDispatch({
      type: 'PREV'
    });
  };

  const forward = () => {
    playerDispatch({
      type: 'SEEK',
      position: 30 * 1000,
      relative: true,
    });
  };

  const back = () => {
    playerDispatch({
      type: 'SEEK',
      position: -1 * 10 * 1000,
      relative: true,
    });
  };

  return (
    <div className={classes.root}>
      <IconButton color="secondary" size="small" onClick={prev}>
        <SkipPreviousRounded fontSize="large" />
      </IconButton>
      <IconButton color="secondary" size='small' onClick={back}>
        <Replay10Rounded fontSize="large" />
      </IconButton>
      {controlState.isPlaying ?
      <IconButton color="secondary" size='small' onClick={pause}>
        <PauseCircleOutlineRounded className={classes.bigIcon} />
      </IconButton> :
      <IconButton color="secondary" size='small' onClick={play}>
        <PlayCircleOutlineRounded className={classes.bigIcon} />
      </IconButton>}
      <IconButton color="secondary" size='small' onClick={forward}>
        <Forward30Rounded fontSize="large" />
      </IconButton>
      <IconButton color="secondary" size='small' onClick={next}>
        <SkipNextRounded fontSize="large" />
      </IconButton>
    </div>
  );
};

export default MediaControls;