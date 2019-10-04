export enum TrackSource {
  EMPTY = 'empty',
  SOUNDCLOUD = 'soundcloud',
  SPOTIFY = 'spotify'
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

export type Artist = {
  id: string,
  name: string,
  artwork: string,
  source: TrackSource,
}

export type Queue = {
  track?: Track,
  prev: Track[],
  next: Track[],
};

export type PlayerEffect =
  'START' |
  'PLAY' |
  'PAUSE' |
  'STOP' |
  'SEEK';

export type PlayerRequest = {
  effect?: PlayerEffect
  seekPos?: number,
};

export type PlayerActualState = {
  position: number,
  isPlaying: boolean,
  isDone: boolean,
}

export type PlayerState = {
  queue: Queue,
  player: PlayerActualState,
  request: PlayerRequest,
};

export type PlayerActionType =
  'PLAY' |
  'PAUSE' |
  'NEXT' |
  'PREV' |
  'SEEK' |
  'ADD_TO_QUEUE' |
  'REMOVE_FROM_QUEUE' |
  'PLAY_FROM_QUEUE' |
  'SET_QUEUE' |
  'SET_PLAYER_STATE' |
  'RESET_REQUEST';

export type PlayerAction = {
  type: PlayerActionType,
  track?: Track,
  queue?: Queue,
  position?: number,
  relative?: boolean,
  player?: PlayerActualState,
};

export type Progress = {
  position: number,
  duration: number,
};

export type ControlState = {
  isEnabled: boolean,
  isPlaying: boolean,
}
