import { Track, Queue } from "../types/playerTypes";

export const createQueue = (findTrack: Track, tracks: Track[]): Queue => {
  var prevQueue: Track[] = [];
  var nextQueue: Track[] = [];
  var track: Track | undefined = undefined;

  const index = tracks.indexOf(findTrack);
  
  if (index >= 0 && index < tracks.length) {
    prevQueue = tracks.slice(0, index).reverse();
    nextQueue = tracks.slice(index + 1, tracks.length);
    track = tracks[index];
  }

  return {
    track: track,
    prev: prevQueue,
    next: nextQueue,
  };
}