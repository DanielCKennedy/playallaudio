import Player from "./Player";
import { Track, PlayerActualState } from "../types/playerTypes";

class EmptyPlayer implements Player {
  isEnabled: boolean;

  constructor() {
    this.isEnabled = false;
  }

  init(clientId: string): void {
    throw new Error("EmptyPlayer isn't enabled");
  } 

  start(track: Track): Promise<PlayerActualState> {
    throw new Error("EmptyPlayer isn't enabled");
  }

  play(): Promise<PlayerActualState> {
    throw new Error("EmptyPlayer isn't enabled");
  }

  pause(): Promise<PlayerActualState> {
    throw new Error("EmptyPlayer isn't enabled");
  }

  seek(position: number): Promise<PlayerActualState> {
    throw new Error("EmptyPlayer isn't enabled");
  }

  stop(): Promise<PlayerActualState> {
    throw new Error("EmptyPlayer isn't enabled");
  }

  getState(): Promise<PlayerActualState> {
    throw new Error("EmptyPlayer isn't enabled");
  }
};

export default EmptyPlayer;