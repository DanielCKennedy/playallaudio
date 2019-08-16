import { requestPlayerEffect, addToQueue, next, prev, setPlayerState } from "./playerUtils";
import { mockPlayerState, mockTrack1, mockTrack2, mockTrack3 } from "../mocks/playerMocks";
import { emptyPlayerState, emptyPlayerActualState } from "../constants/playerConstants";
import { PlayerActualState } from "../types/playerTypes";

/* requestPlayerEffect */
it("requestPlayerEffect only updates the PlayerState's request field", () => {
  const initialState = mockPlayerState;
  const state = requestPlayerEffect(initialState, 'PLAY');

  expect(state).toEqual({
    ...initialState,
    request: {
      effect: 'PLAY',
      seekPos: undefined
    }
  });
});

it("requestPlayerEffect gives the request's seekPos field if a seek command", () => {
  const initialState = mockPlayerState;

  // set seekPos
  const seekState = requestPlayerEffect(initialState, 'SEEK', 5);
  expect(seekState).toEqual({
    ...initialState,
    request: {
      effect: 'SEEK',
      seekPos: 5
    }
  });

  // should reset seekPos to undefined
  const state = requestPlayerEffect(seekState, 'PLAY');
  expect(state).toEqual({
    ...seekState,
    request: {
      effect: 'PLAY',
      seekPos: undefined
    }
  });
});

it("requestPlayerEffect resets the request if effect not given", () => {
  const initialState = mockPlayerState;

  // set request effect and seekPos
  const seekState = requestPlayerEffect(initialState, 'SEEK', 5);
  expect(seekState).toEqual({
    ...initialState,
    request: {
      effect: 'SEEK',
      seekPos: 5
    }
  });

  // should reset effect and seekPos to undefined
  const state = requestPlayerEffect(seekState);
  expect(state).toEqual({
    ...seekState,
    request: {
      effect: undefined,
      seekPos: undefined
    }
  });
});

/* addToQueue */
it("addToQueue returns initial state if no track", () => {
  const initialState = mockPlayerState;
  const state = addToQueue(initialState, undefined);

  expect(state).toEqual(initialState);
});

it("addToQueue sets and starts the track if queue empty", () => {
  const initialState = emptyPlayerState;
  const state = addToQueue(initialState, mockTrack1);

  expect(state).toEqual({
    ...initialState,
    queue: {
      ...initialState.queue,
      track: mockTrack1
    },
    request: {
      effect: 'START',
      seekPos: undefined,
    }
  });
});

it("addToQueue adds to queue if queue empty but track set", () => {
  const initialState = {
    ...emptyPlayerState,
    queue: {
      ...emptyPlayerState.queue,
      track: mockTrack1,
      next: [],
    }
  };
  const state = addToQueue(initialState, mockTrack2);

  expect(state).toEqual({
    ...initialState,
    queue: {
      ...initialState.queue,
      track: mockTrack1,
      next: [mockTrack2],
    }
  });
});

it("addToQueue adds to end of next queue", () => {
  const initialState = {
    ...emptyPlayerState,
    queue: {
      ...emptyPlayerState.queue,
      track: mockTrack1,
      next: [mockTrack2],
    }
  };
  const state = addToQueue(initialState, mockTrack3);

  expect(state).toEqual({
    ...initialState,
    queue: {
      ...initialState.queue,
      track: mockTrack1,
      next: [mockTrack2, mockTrack3],
    }
  });
});

/* next */
it("next starts current track if no queue", () => {
  const initialState = {
    ...emptyPlayerState,
    queue: {
      ...emptyPlayerState.queue,
      track: mockTrack1,
    }
  };
  const state = next(initialState);

  expect(state).toEqual({
    ...initialState,
    request: {
      effect: "START",
      seekPos: undefined,
    }
  });
});

it("next starts the first track in the next queue", () => {
  const initialState = {
    ...emptyPlayerState,
    queue: {
      ...emptyPlayerState.queue,
      track: mockTrack1,
      next: [mockTrack2, mockTrack3]
    }
  };
  const state = next(initialState);

  expect(state).toEqual({
    ...initialState,
    queue: {
      track: mockTrack2,
      next: [mockTrack3],
      prev: [mockTrack1]
    },
    request: {
      effect: "START",
      seekPos: undefined,
    }
  });
});

it("next puts current track to beginning of prev queue", () => {
  const initialState = {
    ...emptyPlayerState,
    queue: {
      ...emptyPlayerState.queue,
      track: mockTrack1,
      next: [mockTrack2],
      prev: [mockTrack3]
    }
  };
  const state = next(initialState);

  expect(state).toEqual({
    ...initialState,
    queue: {
      track: mockTrack2,
      next: [],
      prev: [mockTrack1, mockTrack3]
    },
    request: {
      effect: "START",
      seekPos: undefined,
    }
  });
});

/* prev */
it("prev starts current track if no queue", () => {
  const initialState = {
    ...emptyPlayerState,
    queue: {
      ...emptyPlayerState.queue,
      track: mockTrack1,
    }
  };
  const state = prev(initialState);

  expect(state).toEqual({
    ...initialState,
    request: {
      effect: "START",
      seekPos: undefined,
    }
  });
});

it("prev starts the first track in the prev queue", () => {
  const initialState = {
    ...emptyPlayerState,
    queue: {
      ...emptyPlayerState.queue,
      track: mockTrack1,
      prev: [mockTrack2, mockTrack3]
    }
  };
  const state = prev(initialState);

  expect(state).toEqual({
    ...initialState,
    queue: {
      track: mockTrack2,
      prev: [mockTrack3],
      next: [mockTrack1]
    },
    request: {
      effect: "START",
      seekPos: undefined,
    }
  });
});

it("prev puts current track to beginning of next queue", () => {
  const initialState = {
    ...emptyPlayerState,
    queue: {
      ...emptyPlayerState.queue,
      track: mockTrack1,
      next: [mockTrack2],
      prev: [mockTrack3]
    }
  };
  const state = prev(initialState);

  expect(state).toEqual({
    ...initialState,
    queue: {
      track: mockTrack3,
      prev: [],
      next: [mockTrack1, mockTrack2]
    },
    request: {
      effect: "START",
      seekPos: undefined,
    }
  });
});

/* setPlayerState */
it("setPlayerState should set player if present", () => {
  const initialState = mockPlayerState;
  const player: PlayerActualState = {
    position: 5,
    isPlaying: true,
  };
  const state = setPlayerState(initialState, player);

  expect(state).toEqual({
    ...initialState,
    player: player,
  });
});

it("setPlayerState should set an empty player if player not present", () => {
  const initialState = mockPlayerState;
  const player = undefined;
  const state = setPlayerState(initialState, player);

  expect(state).toEqual({
    ...initialState,
    player: emptyPlayerActualState,
  });
});
