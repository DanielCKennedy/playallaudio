
import { requestPlayerEffect, addToQueue, next, prev, setPlayerState, seek } from "../utils/playerUtils";
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
    case 'SET_PLAYER_STATE':
      return setPlayerState(state, action.player);
    case 'RESET_REQUEST':
      return requestPlayerEffect(state);
    default:
      return state;
  }
};

export default playerReducer;
