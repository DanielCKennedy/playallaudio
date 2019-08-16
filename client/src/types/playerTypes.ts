export enum TrackSource {
  EMPTY = 'empty',
};

export type TrackDetails = {
  id: string,
  title: string,
  artists: string[],
  duration: number,
  artwork: string,
  source: TrackSource,
  externalUrl: string,
};

export type Track = {
  id: string,
  details: TrackDetails,
};

export type Queue = {
  track?: Track,
  prev: Track[],
  next: Track[],
};

export type PlayerEffect =
  'START' |
  'PLAY' |
  'PAUSE' |
  'SEEK';

export type PlayerRequest = {
  effect?: PlayerEffect
  seekPos?: number,
};

export type PlayerState = {
  queue: Queue,
  position: number,
  request: PlayerRequest,
};

export type PlayerActionType =
  'PLAY' |
  'PAUSE' |
  'NEXT' |
  'PREV' |
  'SEEK' |
  'ADD_TO_QUEUE' |
  'RESET_REQUEST';

export type PlayerAction = {
  type: PlayerActionType,
  track?: Track,
  position?: number,
};
