import { Track, PlayerActualState } from "../types/playerTypes";

interface Player {
  isEnabled: boolean,
  init: (clientId: string) => void,
  start: (track: Track) => Promise<PlayerActualState>,
  play: () => Promise<PlayerActualState>,
  pause: () => Promise<PlayerActualState>,
  stop: () => Promise<PlayerActualState>,
  seek: (position: number) => Promise<PlayerActualState>,
  getState: () => Promise<PlayerActualState>
}

export default Player;
