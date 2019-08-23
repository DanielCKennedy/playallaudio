import { PlayerActualState, PlayerState, Progress } from "../types/playerTypes";

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
