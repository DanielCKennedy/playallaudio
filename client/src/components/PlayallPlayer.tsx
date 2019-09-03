import React, { useEffect, useReducer, useState } from 'react';
import SoundCloud from 'soundcloud';
import playerReducer from '../reducers/playerReducer';
import Player from '../players/Player';
import SoundcloudPlayer from '../players/SoundcloudPlayer';
import { PlayerAction, TrackSource, PlayerActualState, Progress } from '../types/playerTypes';
import { emptyPlayerState, emptyProgress } from '../constants/playerConstants';

export const PlayerDispatchContext = React.createContext<React.Dispatch<PlayerAction>>((playerAction: PlayerAction) => {});
export const ProgressContext = React.createContext<Progress>(emptyProgress);

type PlayallPlayerProps = {
  soundcloudClientId?: string,
}

type Players = {
  [TrackSource.SOUNDCLOUD]: Player
}

const players: Players = {
  [TrackSource.SOUNDCLOUD]: new SoundcloudPlayer(SoundCloud),
};

var interval: NodeJS.Timeout;

const PlayallPlayer: React.FC<PlayallPlayerProps> = ( { soundcloudClientId, children } ) => {
  const [playerState, playerDispatch] = useReducer(playerReducer, emptyPlayerState);
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  
  const handlePlayerCommand = (playerPromise: Promise<PlayerActualState>) => {
    playerPromise.then((state: PlayerActualState) => {
      console.log(state);
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

  // Handle player effect requests
  useEffect(() => {
    if (playerState.queue.track && players[playerState.queue.track.details.source].isEnabled) {
      const request = playerState.request;
      const source = playerState.queue.track.details.source;
      if (request.effect !== undefined) {
        playerDispatch({ type: 'RESET_REQUEST' });
        switch (request.effect) {
          case 'START':
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
  }, [playerState.request, playerState.queue.track]);

  // Get updated player state while track is playing
  useEffect(() => {
    if (playerState.player.isPlaying && playerState.queue.track && players[playerState.queue.track.details.source].isEnabled) {
      const source = playerState.queue.track.details.source;
      interval = setInterval(() => {
        handlePlayerCommand(players[source].getState());
      }, 500);
    }

    return () => {
      clearInterval(interval);
    }
  }, [playerState.player.isPlaying, playerState.queue.track]);

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
        {children}
      </ProgressContext.Provider>
    </PlayerDispatchContext.Provider>
  );
}

export default PlayallPlayer;