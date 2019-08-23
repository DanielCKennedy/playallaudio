import { requestPlayerEffect, addToQueue, next, prev, setPlayerState, seek, setQueue } from "./playerUtils";
import { mockPlayerState, mockTrack1, mockTrack2, mockTrack3, mockQueue } from "../mocks/playerMocks";
import { emptyPlayerState, emptyPlayerActualState } from "../constants/playerConstants";
import { PlayerActualState } from "../types/playerTypes";

describe("requestPlayerEffect", () => {
  it("only updates the PlayerState's request field", () => {
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

  it("gives the request's seekPos field if a seek command", () => {
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

  it("resets the request if effect not given", () => {
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
});

describe("addToQueue", () => {
  it("returns initial state if no track", () => {
    const initialState = mockPlayerState;
    const state = addToQueue(initialState, undefined);

    expect(state).toEqual(initialState);
  });

  it("sets and starts the track if queue empty", () => {
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

  it("adds to queue if queue empty but track set", () => {
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

  it("adds to end of next queue", () => {
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
});

describe("setQueue", () => {
  it("returns initial state when no queue given", () => {
    const initialState = mockPlayerState;
    const state = setQueue(initialState, undefined);

    expect(state).toEqual(initialState);
  }),

  it("sets the queue and requests start when queue is given", () => {
    const initialState = {
      ...emptyPlayerState,
      queue: {
        ...emptyPlayerState.queue,
        track: mockTrack1,
        next: [mockTrack2, mockTrack3],
      }
    };
    const state = setQueue(initialState, mockQueue);

    expect(state).toEqual({
      ...initialState,
      queue: mockQueue,
      player: {
        ...initialState.player,
        position: 0,
        isDone: false,
      },
      request: {
        effect: 'START',
        seekPos: undefined,
      }
    });
  })
})

describe("next", () => {
  it("starts current track if no queue", () => {
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

  it("starts the first track in the next queue", () => {
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

  it("puts current track to beginning of prev queue", () => {
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
});


describe("prev", () => {
  it("starts current track if no queue", () => {
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

  it("starts the first track in the prev queue", () => {
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

  it("puts current track to beginning of next queue", () => {
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
});


describe("setPlayerState", () => {
  it("should set player if present", () => {
    const initialState = mockPlayerState;
    const player: PlayerActualState = {
      position: 5,
      isPlaying: true,
      isDone: false,
    };
    const state = setPlayerState(initialState, player);

    expect(state).toEqual({
      ...initialState,
      player: player,
    });
  });

  it("should set an empty player if player not present", () => {
    const initialState = mockPlayerState;
    const player = undefined;
    const state = setPlayerState(initialState, player);

    expect(state).toEqual({
      ...initialState,
      player: emptyPlayerActualState,
    });
  });

  it("should call next when isDone = true", () => {
    const initialState = {
      ...emptyPlayerState,
      queue: {
        ...emptyPlayerState.queue,
        track: mockTrack1,
        next: [mockTrack2],
        prev: [mockTrack3]
      }
    };
    const player: PlayerActualState = {
      position: 5,
      isPlaying: false,
      isDone: true,
    };
    const nextState = next(initialState);
    const state = setPlayerState(initialState, player);

    expect(state).toEqual(nextState);
  });
});


describe("seek", () => {
  it("requests a seek effect if position is less than track duration", () => {
    const initialState = {
      ...emptyPlayerState,
      queue: {
        ...emptyPlayerState.queue,
        track: {
          ...mockTrack1,
          duration: 5000
        }
      },
      player: {
        ...emptyPlayerState.player,
        position: 1000,
      }
    };
    const position = 4000;
    const relative = undefined;
    const state = seek(initialState, position, relative);

    expect(state).toEqual({
      ...initialState,
      request: {
        effect: 'SEEK',
        seekPos: position
      }
    });
  });

  it("plays prev if position < 0", () => {
    const initialState = {
      ...emptyPlayerState,
      queue: {
        ...emptyPlayerState.queue,
        track: {
          ...mockTrack1,
          details: {
            ...mockTrack1.details,
            duration: 5000
          }
        }
      },
      player: {
        ...emptyPlayerState.player,
        position: 1000,
      }
    };
    const prevState = prev(initialState);
    const position = -5000;
    const relative = true;
    const state = seek(initialState, position, relative);

    expect(state).toEqual(prevState);
  });

  it("plays next if position > duration", () => {
    const initialState = {
      ...emptyPlayerState,
      queue: {
        ...emptyPlayerState.queue,
        track: {
          ...mockTrack1,
          details: {
            ...mockTrack1.details,
            duration: 5000
          }
        }
      },
      player: {
        ...emptyPlayerState.player,
        position: 1000,
      }
    };
    const nextState = next(initialState);
    const position = 12000;
    const relative = true;
    const state = seek(initialState, position, relative);

    expect(state).toEqual(nextState);
  });
});
