import Player from "./Player";
import SoundCloud from 'soundcloud';
import { Track, PlayerActualState } from "../types/playerTypes";

const createPromiseState = (state: PlayerActualState) => {
  return new Promise<PlayerActualState>((resolve) => {
    return resolve(state);
  });
};

class SoundcloudPlayer implements Player {
  soundcloudApi: SoundCloud;
  soundcloudPlayer?: SoundCloud.Player;
  isEnabled: boolean;

  constructor(soundcloudApi: SoundCloud) {
    this.soundcloudApi = soundcloudApi;
    this.isEnabled = false;
  }

  init(clientId: string): void {
    console.log("initialize SoundCloudPlayer");
    this.soundcloudApi.initialize({
      client_id: clientId
    });
    this.isEnabled = true;
  }

  start(track: Track): Promise<PlayerActualState> {
    if (this.isEnabled) {
      return this.soundcloudApi.stream(`/tracks/${track.details.id}`)
        .then((player: SoundCloud.Player) => {
          this.soundcloudPlayer = player;
          this.soundcloudPlayer.play();
          this.soundcloudPlayer.on('finish', () => {
            if (this.soundcloudPlayer) {
              this.soundcloudPlayer.kill();
            }
          });
          return this.getState();
        });
    }
    else {
      throw new Error("SoundcloudPlayer isn't enabled");
    }
  }

  play(): Promise<PlayerActualState> {
    if (this.isEnabled && this.soundcloudPlayer) {
      if (this.soundcloudPlayer.isDead()) {
        return this.getState();
      }
      return this.soundcloudPlayer.play()
        .then(() => {
          return this.getState();
        })
        .catch(() => {
          return this.getState();
        });
    }
    else {
      throw new Error("SoundcloudPlayer isn't enabled");
    }
  }

  pause(): Promise<PlayerActualState> {
    if (this.isEnabled && this.soundcloudPlayer) {
      if (this.soundcloudPlayer.isDead()) {
        return this.getState();
      }
      this.soundcloudPlayer.pause();
      return this.getState();
    }
    else {
      throw new Error("SoundcloudPlayer isn't enabled");
    }
  }

  seek(position: number): Promise<PlayerActualState> {
    if (this.isEnabled && this.soundcloudPlayer) {
      if (this.soundcloudPlayer.isDead()) {
        return this.getState();
      }
      this.soundcloudPlayer.seek(position);
      return this.soundcloudPlayer.seek(position)
        .then(() => {
          return this.getState();
        })
        .catch(() => {
          return this.getState();
        });
    }
    else {
      throw new Error("SoundcloudPlayer isn't enabled");
    }
  }

  stop(): Promise<PlayerActualState> {
    if (this.isEnabled && this.soundcloudPlayer) {
      this.soundcloudPlayer.kill();
      return new Promise((resolve) => {
        return resolve({
          position: 0,
          isPlaying: false,
          isDone: true,
        });
      });
    }
    else {
      this.soundcloudPlayer = undefined;
      throw new Error("SoundcloudPlayer isn't enabled");
    }
  }

  getState(): Promise<PlayerActualState> {
    if (this.isEnabled && this.soundcloudPlayer) {
      const position = this.soundcloudPlayer.currentTime();
      switch (this.soundcloudPlayer.getState()) {
        case "playing":
          return createPromiseState({
            position: position,
            isPlaying: true,
            isDone: false,
          });
        case "paused" || "loading":
          return createPromiseState({
            position: position,
            isPlaying: false,
            isDone: false,
          });
        case "ended":
          return this.stop();
        default:
          return this.stop();
      }
    }
    else {
      return this.stop();
    }
  }
}

export default SoundcloudPlayer;
