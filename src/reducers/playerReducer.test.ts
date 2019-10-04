import playerReducer from './playerReducer';
import { mockPlayerState } from '../mocks/playerMocks';
import { PlayerState } from '../types/playerTypes';

it('PLAY action makes a play request', () => {
  const initialState = mockPlayerState;
  const state = playerReducer(initialState, {
    type: 'PLAY'
  });

  expect(state).toEqual({
    ...initialState,
    request: {
      effect: 'PLAY',
      seekPos: undefined,
    }
  });
});

it('PAUSE action makes a pause request', () => {
  const initialState = mockPlayerState;
  const state = playerReducer(initialState, {
    type: 'PAUSE'
  });

  expect(state).toEqual({
    ...initialState,
    request: {
      effect: 'PAUSE',
      seekPos: undefined,
    }
  });
});

it('SEEK action makes a seek request', () => {
  const initialState = mockPlayerState;
  const state = playerReducer(initialState, {
    type: 'SEEK',
    position: 5,
  });

  expect(state).toEqual({
    ...initialState,
    request: {
      effect: 'SEEK',
      seekPos: 5,
    }
  });
});

it('RESET_REQUEST action resets the request', () => {
  const initialState: PlayerState = {
    ...mockPlayerState,
    request: {
      effect: 'SEEK',
      seekPos: 5,
    }
  };
  const state = playerReducer(initialState, {
    type: 'RESET_REQUEST',
  });

  expect(state).toEqual({
    ...initialState,
    request: {
      effect: undefined,
      seekPos: undefined,
    }
  });
});
