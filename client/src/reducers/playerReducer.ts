
import { requestPlayerEffect, addToQueue, next, prev, setPlayerState, seek, setQueue, removeFromQueue, playFromQueue } from "../utils/playerUtils";
import { PlayerState, PlayerAction } from "../types/playerTypes";

/**
 * This reducer returns a new PlayerState based on the current state and the passed in action.
 * This reducer is the main way to make requests to the current music player.
 * 
 * @param state PlayerState is the state of player
 * @param action PlayerAction is a request to change the state
 * @returns PlayerState
 */
const playerReducer = (state: PlayerState, action: PlayerAction) => {
  switch (action.type) {
    case 'PLAY':
      return requestPlayerEffect(state, 'PLAY');
    case 'PAUSE':
      return requestPlayerEffect(state, 'PAUSE');
    case 'SEEK':
      return seek(state, action.position, action.relative);
    case 'NEXT':
      return next(state);
    case 'PREV':
      return prev(state);
    case 'ADD_TO_QUEUE':
      return addToQueue(state, action.track);
    case 'REMOVE_FROM_QUEUE':
      return removeFromQueue(state, action.track);
    case 'PLAY_FROM_QUEUE':
      return playFromQueue(state, action.track);
    case 'SET_QUEUE':
      return setQueue(state, action.queue);
    case 'SET_PLAYER_STATE':
      return setPlayerState(state, action.player);
    case 'RESET_REQUEST':
      return requestPlayerEffect(state);
    default:
      return state;
  }
};

export default playerReducer;
