import { PlayerState, PlayerEffect, Track, PlayerActualState } from "../types/playerTypes";
import { emptyPlayerActualState } from "../constants/playerConstants";

/**
 * Returns a PlayerState with an updated request field.
 * Requests are requested effects to the current music player.
 * 
 * @param state PlayerState
 * @param effect PlayerEffect request
 * @param seekPos number in milliseconds to seek to
 * @returns PlayerState with updated request
 */
export const requestPlayerEffect = (state: PlayerState, effect?: PlayerEffect, seekPos?: number) => {
  return {
    ...state,
    request: {
      effect: effect,
      seekPos: seekPos,
    }
  }
};

const addTrackToQueue = (state: PlayerState, track: Track) => {
  var nextQueue = state.queue.next;
  nextQueue.push(track);
  return {
    ...state,
    queue: {
      ...state.queue,
      next: nextQueue,
    }
  };
};

const setTrack = (state: PlayerState, track: Track) => {
  return {
    ...state,
    queue: {
      ...state.queue,
      track: track,
    },
    player: {
      ...state.player,
      position: 0,
      isDone: false,
    }
  };
};

const startTrack = (state: PlayerState, track: Track) => {
  return requestPlayerEffect(setTrack(state, track), 'START');
};

const startNext = (state: PlayerState) => {
  var nextQueue = state.queue.next.map((val) => val);
  var prevQueue = state.queue.prev.map((val) => val);
  const prevTrack = state.queue.track;
  const nextTrack = nextQueue.shift();
  if (nextTrack) {
    if (prevTrack) {
      prevQueue.unshift(prevTrack);
    }
    return startTrack({
      ...state,
      queue: {
        track: undefined,
        next: nextQueue,
        prev: prevQueue,
      },
    }, nextTrack);
  }
  return state;
};

const startPrev = (state: PlayerState) => {
  var nextQueue = state.queue.next.map((val) => val);
  var prevQueue = state.queue.prev.map((val) => val);
  const prevTrack = state.queue.track;
  const nextTrack = prevQueue.shift();
  if (nextTrack) {
    if (prevTrack) {
      nextQueue.unshift(prevTrack);
    }
    return startTrack({
      ...state,
      queue: {
        track: undefined,
        next: nextQueue,
        prev: prevQueue,
      }
    }, nextTrack);
  }
  return state;
};

const loopQueues = (state: PlayerState) => {
  var nextQueue = state.queue.next.map((val) => val);
  var prevQueue = state.queue.prev.map((val) => val);
  var newNextQueue = prevQueue.reverse();
  var newPrevQueue = nextQueue.reverse();
  return {
    ...state,
    queue: {
      ...state.queue,
      next: newNextQueue,
      prev: newPrevQueue,
    }
  };
};

const loopAndStartNext = (state: PlayerState) => {
  if (state.queue.track) {
    var prevQueue = state.queue.prev.map((val) => val);
    prevQueue.push(state.queue.track);
    return startNext(loopQueues({
      ...state,
      queue: {
        ...state.queue,
        prev: prevQueue,
        track: undefined,
      }
    }));
  }
  return state;
};

const loopAndStartPrev = (state: PlayerState) => {
  if (state.queue.track) {
    var nextQueue = state.queue.next.map((val) => val);
    nextQueue.push(state.queue.track);
    return startPrev(loopQueues({
      ...state,
      queue: {
        ...state.queue,
        next: nextQueue,
        track: undefined,
      }
    }));
  }
  return state;
};

/**
 * Adds the track to the queue.
 * 
 * @param state PlayerState
 * @param track Track
 * @returns PlayerState
 */
export const addToQueue = (state: PlayerState, track?: Track) => {
  if (track) {
    if (state.queue.track) {
      return addTrackToQueue(state, track);
    }
    else {
      return startTrack(state, track);
    }
  }
  return state;
};

/**
 * Plays the next track in the queue.
 * 
 * @param state PlayerState
 * @returns PlayerState
 */
export const next = (state: PlayerState) => {
  if (state.queue.next.length) {
    return startNext(state);
  }
  else {
    return loopAndStartNext(state);
  }
};

/**
 * Plays the previous track in the queue.
 * 
 * @param state PlayerState
 * @returns PlayerState
 */
export const prev = (state: PlayerState) => {
  if (state.queue.prev.length) {
    return startPrev(state);
  }
  else {
    return loopAndStartPrev(state);
  }
};

/**
 * Sets the PlayerActualState
 * 
 * @param state PlayerState
 * @param playerState PlayerActualState
 * @returns PlayerState
 */
export const setPlayerState = (state: PlayerState, playerState?: PlayerActualState) => {
  if (playerState) {
    if (playerState.isDone) {
      return next(state);
    }
    else {
      return {
        ...state,
        player: playerState,
      };
    }
  }
  else {
    return {
      ...state,
      player: emptyPlayerActualState,
    }
  }
}
