import Player from "./Player";
import { Track, PlayerActualState } from "../types/playerTypes";

class SpotifyPlayer implements Player {
  deviceId: string;
  accessToken: string;
  player?: Spotify.SpotifyPlayer;
  isEnabled: boolean;
  isDone: boolean;
  state: PlayerActualState;

  constructor() {
    this.deviceId = "";
    this.accessToken = "";
    this.isEnabled = false;
    this.isDone = false;
    this.state = {
      position: 0,
      isPlaying: false,
      isDone: false,
    };
  }

  private spotifyStateChanged(state: Spotify.PlaybackState | null): void {
    if (state) {
      const position = state.position;
      const isPlaying = !state.paused;
      const isDone = state.track_window.previous_tracks.length > 0;

      if (isDone) {
        this.isDone = isDone;
      }

      this.state = {
        position: position,
        isPlaying: isPlaying,
        isDone: isDone,
      };
    }
  };

  init(accessToken: string): void {
    console.log("initialize SpotifyPlayer");
    this.accessToken = accessToken;
    this.player = new window.Spotify.Player({
      name: 'Playall.audio Player',
      getOAuthToken: (cb: (spotifyToken: string) => void) => { cb(accessToken); }
    });
    // Error handling
    this.player.addListener('initialization_error', (e: Spotify.Error) => { console.error(e.message); });
    this.player.addListener('authentication_error', (e: Spotify.Error) => { console.error(e.message); });
    this.player.addListener('account_error', (e: Spotify.Error) => { console.error(e.message); });
    this.player.addListener('playback_error', (e: Spotify.Error) => { console.error(e.message); });

    // Playback status updates
    this.player.removeListener('player_state_changed');
    this.player.addListener('player_state_changed', this.spotifyStateChanged);

    // Ready
    this.player.addListener('ready', (data: Spotify.WebPlaybackInstance) => {
      console.log('Ready with Device ID: ', data.device_id);
      this.deviceId = data.device_id;
    });

    // Not Ready
    this.player.addListener('not_ready', (data: Spotify.WebPlaybackInstance) => {
      console.log('Device ID has gone offline', data.device_id);
      this.deviceId = "";
    });

    // Connect to the player!
    this.player.connect();
    this.isEnabled = true;
  }

  start(track: Track): Promise<PlayerActualState> {
    if (this.isEnabled && this.deviceId) {
      return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({
            uris: [track.details.id]
        })
      })
      .then(() => {
        return this.getState();
      })
      .catch(() => {
        return this.getState();
      });
    }
    else {
      throw new Error("SpotifyPlayer isn't enabled");
    }
  }

  play(): Promise<PlayerActualState> {
    if (this.isEnabled && this.player) {
      return this.player.resume()
        .then(() => {
          return this.getState();
        })
        .catch(() => {
          return this.getState();
        });
    }
    else {
      throw new Error("SpotifyPlayer isn't enabled");
    }
  }

  pause(): Promise<PlayerActualState> {
    if (this.isEnabled && this.player) {
      this.player.pause();
      return this.getState();
    }
    else {
      throw new Error("SpotifyPlayer isn't enabled");
    }
  }

  seek(position: number): Promise<PlayerActualState> {
    if (this.isEnabled && this.player) {
      return this.player.seek(position)
        .then(() => {
          return this.getState();
        })
        .catch(() => {
          return this.getState();
        });
    }
    else {
      throw new Error("SpotifyPlayer isn't enabled");
    }
  }

  stop(): Promise<PlayerActualState> {
    if (this.isEnabled && this.player) {
      return new Promise((resolve) => {
        return resolve({
          position: 0,
          isPlaying: false,
          isDone: true,
        });
      });
    }
    else {
      throw new Error("SpotifyPlayer isn't enabled");
    }
  }

  getState(): Promise<PlayerActualState> {
    if (this.isDone) {
      this.isDone = false;
      return new Promise((resolve) => {
        return resolve({
          position: 0,
          isPlaying: false,
          isDone: true,
        });
      });
    }

    return new Promise((resolve) => {
      return resolve(this.state);
    });
  }
}

export default SpotifyPlayer;
