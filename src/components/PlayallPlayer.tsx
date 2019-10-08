import React, { useEffect, useReducer, useState } from 'react';
import SoundCloud from 'soundcloud';
import playerReducer from '../reducers/playerReducer';
import Player from '../players/Player';
import SoundcloudPlayer from '../players/SoundcloudPlayer';
import { PlayerAction, TrackSource, PlayerActualState, Progress, TrackDetails, ControlState, Queue } from '../types/playerTypes';
import { emptyPlayerState, emptyProgress, emptyTrackDetails, emptyControlState, emptyQueue } from '../constants/playerConstants';
import EmptyPlayer from '../players/EmptyPlayer';
import SpotifyPlayer from '../players/SpotifyPlayer';

export const PlayerDispatchContext = React.createContext<React.Dispatch<PlayerAction>>((playerAction: PlayerAction) => {});
export const ProgressContext = React.createContext<Progress>(emptyProgress);
export const TrackDetailsContext = React.createContext<TrackDetails>(emptyTrackDetails);
export const ControlStateContext = React.createContext<ControlState>(emptyControlState);
export const QueueContext = React.createContext<Queue>(emptyQueue);

type PlayallPlayerProps = {
  soundcloudClientId?: string,
  spotifyAccessToken?: string,
}

type Players = {
  [TrackSource.EMPTY]: Player,
  [TrackSource.SOUNDCLOUD]: Player,
  [TrackSource.SPOTIFY]: Player,
}

const players: Players = {
  [TrackSource.EMPTY]: new EmptyPlayer(),
  [TrackSource.SOUNDCLOUD]: new SoundcloudPlayer(SoundCloud),
  [TrackSource.SPOTIFY]: new SpotifyPlayer(),
};

const stopPlayer = (source: TrackSource) => {
  players[source].isEnabled && players[source].stop();
}

const stopAllBut = (source: TrackSource) => {
  source !== TrackSource.SOUNDCLOUD && stopPlayer(TrackSource.SOUNDCLOUD);
  source !== TrackSource.SPOTIFY && stopPlayer(TrackSource.SPOTIFY);
}

var interval: NodeJS.Timeout;

const PlayallPlayer: React.FC<PlayallPlayerProps> = ( { soundcloudClientId, spotifyAccessToken, children } ) => {
  const [playerState, playerDispatch] = useReducer(playerReducer, emptyPlayerState);
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  
  const handlePlayerCommand = (playerPromise: Promise<PlayerActualState>) => {
    playerPromise.then((state: PlayerActualState) => {
      playerDispatch({ type: 'SET_PLAYER_STATE', player: state });
    })
    .catch((reason) => {
      console.log(reason);
    });
  }

  // Initialize soundcloud player
  useEffect(() => {
    if (soundcloudClientId && !players[TrackSource.SOUNDCLOUD].isEnabled) {
      players[TrackSource.SOUNDCLOUD].init(soundcloudClientId);
    }
  }, [soundcloudClientId]);

  // Initialize spotify player
  useEffect(() => {
    if (spotifyAccessToken && !players[TrackSource.SPOTIFY].isEnabled) {
      players[TrackSource.SPOTIFY].init(spotifyAccessToken);
    }
  }, [spotifyAccessToken]);

  // Handle player effect requests
  useEffect(() => {
    if (playerState.queue.track && players[playerState.queue.track.details.source].isEnabled) {
      const request = playerState.request;
      const source = playerState.queue.track.details.source;
      if (request.effect !== undefined) {
        playerDispatch({ type: 'RESET_REQUEST' });
        switch (request.effect) {
          case 'START':
            stopAllBut(TrackSource.SOUNDCLOUD);
            handlePlayerCommand(players[source].start(playerState.queue.track));
            break;
          case 'PLAY':
            handlePlayerCommand(players[source].play());
            break;
          case 'PAUSE':
            handlePlayerCommand(players[source].pause());
            break;
          case 'SEEK':
            if (request.seekPos) {
              handlePlayerCommand(players[source].seek(request.seekPos));
            }
            break;
          default:
            break;
        }
      }
    }
    if (playerState.request.effect === 'STOP') {
      stopAllBut(TrackSource.EMPTY);
    }
  }, [playerState.request, playerState.queue.track, spotifyAccessToken]);

  // Get updated player state while track is playing
  useEffect(() => {
    if (playerState.queue.track && players[playerState.queue.track.details.source].isEnabled) {
      const source = playerState.queue.track.details.source;
      interval = setInterval(() => {
        stopAllBut(source);
        handlePlayerCommand(players[source].getState());
      }, 500);
    }

    return () => {
      clearInterval(interval);
    }
  }, [playerState.queue.track]);

  // Update progress
  useEffect(() => {
    if (playerState.queue.track) {
      setProgress({
        position: playerState.player.position,
        duration: playerState.queue.track.details.duration,
      });
    }
    else {
      setProgress(emptyProgress);
    }
  }, [playerState.player.position, playerState.queue.track]);

  return (
    <PlayerDispatchContext.Provider value={playerDispatch}>
      <ProgressContext.Provider value={progress}>
        <TrackDetailsContext.Provider value={playerState.queue.track ? playerState.queue.track.details : emptyTrackDetails}>
          <ControlStateContext.Provider value={{ isEnabled: playerState.queue.track !== undefined, isPlaying: playerState.player.isPlaying}}>
            <QueueContext.Provider value={playerState.queue}>
              {children}
            </QueueContext.Provider>
          </ControlStateContext.Provider>
        </TrackDetailsContext.Provider>
      </ProgressContext.Provider>
    </PlayerDispatchContext.Provider>
  );
}

export default PlayallPlayer;
