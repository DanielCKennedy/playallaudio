import { TrackDetails, Track } from "../types/playerTypes";
import uuid from 'uuid';

export const createTrack = (details: TrackDetails) => {
  return {
    id: uuid(),
    details: details,
  };
};

export const recreateTrack = (track: Track) => {
  return {
    id: uuid(),
    details: track.details,
  };
};