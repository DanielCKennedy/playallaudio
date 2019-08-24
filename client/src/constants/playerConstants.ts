import { PlayerActualState, PlayerState, Progress, TrackDetails, TrackSource } from "../types/playerTypes";

export const emptyTrackDetails: TrackDetails = {
  id: "",
  title: "",
  artists: [],
  duration: 0,
  artwork: "",
  source: TrackSource.EMPTY,
  externalUrl: "",
}

export const emptyPlayerActualState: PlayerActualState = {
  position: 0,
  isPlaying: false,
  isDone: false,
}

export const emptyPlayerState: PlayerState = {
  queue: {
    track: undefined,
    prev: [],
    next: []
  },
  player: emptyPlayerActualState,
  request: {
    effect: undefined,
    seekPos: undefined,
  },
};

export const emptyProgress: Progress = {
  position: 0,
  duration: 0,
}
