import Player from "./Player";
import { Track, PlayerActualState } from "../types/playerTypes";

class SpotifyPlayer implements Player {
  deviceId: string;
  accessToken: string;
  player?: Spotify.SpotifyPlayer;
  isEnabled: boolean;
  isDone: boolean;
  hasSong: boolean;

  constructor() {
    this.deviceId = "";
    this.accessToken = "";
    this.isEnabled = false;
    this.isDone = false;
    this.hasSong = false;
  }

  private spotifyStateChanged(state: Spotify.PlaybackState | null, self: any): void {
    if (state) {
      // Track is finished if the previous tracks list gains a value
      const isDone = state.track_window.previous_tracks.length > 0;

      if (isDone) {
        self.isDone = isDone;
      }
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
    this.player.addListener('player_state_changed', (state) => this.spotifyStateChanged(state, this));

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
      this.hasSong = true;
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
            uris: [`spotify:track:${track.details.id}`]
        })
      })
      .then(() => {
        return this.getState(true);
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
          return this.getState(true);
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
          return this.getState(undefined, position);
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
      this.hasSong && this.player.pause();
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

  getState(isPlaying?: boolean, position?: number): Promise<PlayerActualState> {
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

    return this.getPlaybackState()
    .then((playbackState: SpotifyApi.CurrentPlaybackResponse | undefined) => {
      if (playbackState) {
        return {
          position: position || playbackState.progress_ms || 0,
          isPlaying: isPlaying || playbackState.is_playing,
          isDone: false,
        };
      }
      return {
        position: 0,
        isPlaying: true,
        isDone: false,
      }
    })
    .catch(() => {
      return {
        position: 0,
        isPlaying: false,
        isDone: false,
      }
    });
  }

  private getPlaybackState(): Promise<SpotifyApi.CurrentPlaybackResponse | undefined> {
    return fetch(`https://api.spotify.com/v1/me/player`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(d => {
      if (d.status === 204) {
        return new Promise((resolve) => {
          return resolve(undefined);
        });
      }
  
      return d.json();
    });
  }
}

export default SpotifyPlayer;
