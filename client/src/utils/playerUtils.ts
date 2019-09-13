import { PlayerState, PlayerEffect, Track, PlayerActualState, Queue } from "../types/playerTypes";
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

const setTrack = (state: PlayerState, track: Track | undefined) => {
  return {
    ...state,
    queue: {
      ...state.queue,
      track: track,
    },
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
  var prevQueue = state.queue.prev.map((val) => val);
  if (state.queue.track) {
    prevQueue.unshift(state.queue.track);
  }
  return startNext(loopQueues({
    ...state,
    queue: {
      ...state.queue,
      prev: prevQueue,
      track: undefined,
    }
  }));
};

const loopAndStartPrev = (state: PlayerState) => {
  if (state.queue.track) {
    var nextQueue = state.queue.next.map((val) => val);
    nextQueue.unshift(state.queue.track);
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

const removeCurTrackAndPlayNext = (state: PlayerState) => {
  if (state.queue.track) {
    if (state.queue.next.length) {
      return startNext(setTrack(state, undefined));
    }
    else if (state.queue.prev.length) {
      return loopAndStartNext(setTrack(state, undefined));
    }
    else {
      return requestPlayerEffect(setTrack(state, undefined), 'STOP');
    }
  }

  return state;
}

const isCurTrack = (state: PlayerState, track: Track) => {
  return state.queue.track && state.queue.track.id === track.id;
}

const isTrackInNext = (state: PlayerState, track: Track) => {
  return state.queue.next.find(e => e.id === track.id);
}

const isTrackInPrev = (state: PlayerState, track: Track) => {
  return state.queue.prev.find(e => e.id === track.id);
}

const playFromNext = (state: PlayerState, track: Track) => {
  var prevQueue = state.queue.prev.map(e => e);
  var nextQueue = state.queue.next.map(e => e);

  const index = nextQueue.findIndex(e => e.id === track.id);
  var beforeTrackList = nextQueue.splice(0, index);
  nextQueue.shift();
  if (state.queue.track) {
    prevQueue.unshift(state.queue.track);
  }
  var newPrevQueue = beforeTrackList.reverse().concat(prevQueue);

  return startTrack({
    ...state,
    queue: {
      track: track,
      next: nextQueue,
      prev: newPrevQueue
    }
  }, track);
}

const playFromPrev = (state: PlayerState, track: Track) => {
  var prevQueue = state.queue.prev.map(e => e);
  var nextQueue = state.queue.next.map(e => e);

  const index = prevQueue.findIndex(e => e.id === track.id);
  var beforeTrackList = prevQueue.splice(0, index);
  prevQueue.shift();
  if (state.queue.track) {
    nextQueue.unshift(state.queue.track);
  }
  var newNextQueue = beforeTrackList.reverse().concat(nextQueue);

  return startTrack({
    ...state,
    queue: {
      track: track,
      next: newNextQueue,
      prev: prevQueue
    }
  }, track);
}


/**
 * Removes the track from the queue
 * 
 * @param state PlayerState
 * @param track Track
 * @returns PlayerState
 */
export const removeFromQueue = (state: PlayerState, track?: Track) => {
  if (track) {
    if (isCurTrack(state, track)) {
      return removeCurTrackAndPlayNext(state);
    }

    return {
      ...state,
      queue: {
        ...state.queue,
        prev: state.queue.prev.filter(e => e.id !== track.id),
        next: state.queue.next.filter(e => e.id !== track.id),
      }
    }
  }
  return state;
};

/**
 * Plays and repositions tracks in the queue
 * 
 * @param state PlayerState
 * @param track Track
 * @returns PlayerState
 */
export const playFromQueue = (state: PlayerState, track?: Track) => {
  if (track) {
    if (isCurTrack(state, track)) {
      return startTrack(state, track);
    }

    if (isTrackInNext(state, track)) {
      return playFromNext(state, track);
    }

    if (isTrackInPrev(state, track)) {
      return playFromPrev(state, track);
    }
  }
  return state;
};

/**
 * Sets the queue and starts playing
 * 
 * @param state PlayerState
 * @param queue Queue
 * @returns PlayerState
 */
export const setQueue = (state: PlayerState, queue?: Queue) => {
  if (queue) {
    return requestPlayerEffect({
      ...state,
      queue: queue,
      player: {
        ...state.player,
        position: 0,
        isDone: false,
      }
    }, 'START');
  }
  return state;
}

/**
 * Plays the next track in the queue.
 * 
 * @param state PlayerState
 * @returns PlayerState
 */
export const next = (state: PlayerState) => {
  if (state.queue.track) {
    if (state.queue.next.length) {
      return startNext(state);
    }
    else {
      return loopAndStartNext(state);
    }
  }
  return state;
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
};

/**
 * Seeks to the requested position if within bounds of the track's duration.
 * 
 * @param state PlayerState
 * @param position number (in milliseconds) to seek to
 * @param relative boolean whether position is relative or absolute
 * @returns PlayerState
 */
export const seek = (state: PlayerState, position?: number, relative?: boolean) => {
  if (position && state.queue.track) {
    const pos = relative ? state.player.position + position : position;
    if (pos < 0) {
      return prev(state);
    }
    else if (pos > state.queue.track.details.duration) {
      return next(state);
    }
    else {
      return requestPlayerEffect(state, 'SEEK', pos);
    }
  }
  else {
    return state;
  }
};
