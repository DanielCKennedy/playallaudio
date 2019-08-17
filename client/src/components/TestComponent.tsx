import React, { useContext } from 'react';
import { PlayerDispatchContext } from './PlayallPlayer';
import { TrackDetails, TrackSource } from '../types/playerTypes';
import uuid from 'uuid';

const createTrack = (trackDetails: TrackDetails) => {
  return {
    id: uuid(),
    details: trackDetails
  };
}

const trackDetails: TrackDetails = {
  id: "281996914",
  title: "DJ Snake - Let Me Love You (Slander & B-Sides Remix)",
  artists: ['SLANDER VIP'],
  duration: 195543,
  artwork: "https://i1.sndcdn.com/artworks-000181429431-0bjjfu-crop.jpg",
  source: TrackSource.SOUNDCLOUD,
  externalUrl: "",
}

const TestComponent: React.FC = () => {
  const playerDispatch = useContext(PlayerDispatchContext);

  return (
    <React.Fragment>
      <button onClick={() => playerDispatch({ type: 'ADD_TO_QUEUE', track: createTrack(trackDetails) })}>Add to queue</button>
      <button onClick={() => playerDispatch({ type: 'PLAY' })}>PLAY</button>
      <button onClick={() => playerDispatch({ type: 'PAUSE' })}>PAUSE</button>
      <button onClick={() => playerDispatch({ type: 'NEXT' })}>NEXT</button>
      <button onClick={() => playerDispatch({ type: 'PREV' })}>PREV</button>
      <button onClick={() => playerDispatch({ type: 'SEEK', position: 186000 })}>SEEK</button>
    </React.Fragment>
  );
}

export default TestComponent;
