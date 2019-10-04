import React, { useContext } from 'react';
import { ProgressContext } from './PlayallPlayer';
import { progressToFormattedTime } from '../utils/timeUtils';

const ProgressTime: React.FC = () => {
  const progress = useContext(ProgressContext);

  return (
    <React.Fragment>
      {progressToFormattedTime(progress)}
    </React.Fragment>
  );
};

export default ProgressTime;