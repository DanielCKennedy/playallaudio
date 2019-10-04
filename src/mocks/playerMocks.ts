import { PlayerState, TrackDetails, TrackSource, Track, Queue } from "../types/playerTypes";

export const mockTrackDetails: TrackDetails = {
  id: "1",
  title: "title",
  artists: ["artist1", "artist2"],
  duration: 123456,
  artwork: "artworkUrl",
  source: TrackSource.SOUNDCLOUD,
  externalUrl: "externalUrl",
};

export const mockTrack1: Track = {
  id: "1",
  details: mockTrackDetails,
};

export const mockTrack2: Track = {
  id: "2",
  details: mockTrackDetails,
};

export const mockTrack3: Track = {
  id: "3",
  details: mockTrackDetails,
};

export const mockQueue: Queue = {
  track: mockTrack1,
  prev: [mockTrack2],
  next: [mockTrack3]
}

export const mockPlayerState: PlayerState = {
  queue: mockQueue,
  player: {
    position: 12,
    isPlaying: false,
    isDone: false,
  },
  request: {
    effect: undefined,
    seekPos: undefined,
  },
};
