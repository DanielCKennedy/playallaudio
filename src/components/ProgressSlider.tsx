import React, { useContext } from 'react';
import { PlayerDispatchContext, ProgressContext } from './PlayallPlayer';
import { Slider, withStyles } from '@material-ui/core';

const PlayallSlider = withStyles({
  root: {
    color: 'hsla(290, 70%, 40%, 1)',
    padding: 0,
    margin: 0,
    paddingBottom: 8,
  },
  thumb: {
    display: 'none',
  },
  track: {
    height: 8,
  },
  rail: {
    height: 8,
    color: 'hsla(290, 70%, 40%, 1)',
  },
})(Slider);

const ProgressSlider: React.FC = () => {
  const playerDispatch = useContext(PlayerDispatchContext);
  const progress = useContext(ProgressContext);

  return (
    <PlayallSlider
      aria-label="Progress Slider"
      defaultValue={0}
      disabled={progress.position === 0}
      min={0}
      max={progress.duration === 0 ? 1 : progress.duration}
      value={progress.position}
      onChangeCommitted={(event: object, value: any) => playerDispatch({
        type: 'SEEK',
        position: value,
      })}
    />
  );
};

export default ProgressSlider;