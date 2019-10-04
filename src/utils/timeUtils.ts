import { Progress } from "../types/playerTypes";

const formatTimeSegment = (time: number) => {
  return ('0' + Math.floor(time)).slice(-2);
};

const millisToFormattedTime = (millis: number, withHours: boolean) => {
  const totalSeconds = Math.floor(millis / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  const seconds = totalSeconds - totalMinutes * 60;
  const minutes = totalMinutes - totalHours * 60;

  const hourSegment = formatTimeSegment(totalHours);
  const minSegment = formatTimeSegment(minutes);
  const secSegment = formatTimeSegment(seconds);

  if (withHours) {
    return `${hourSegment}:${minSegment}:${secSegment}`;
  }
  else {
    return `${minSegment}:${secSegment}`;
  }
};

const hasHours = (millis: number) => {
  return (millis / 1000 / 60 / 60) >= 1;
}

/**
 * Creates a formatted time string from the progress
 * 
 * @param progress Progress
 * @returns formatted time string
 */
export const progressToFormattedTime = (progress: Progress) => {
  const withHours = hasHours(progress.duration);
  const formattedPosition = millisToFormattedTime(progress.position, withHours);
  const formattedDuration = millisToFormattedTime(progress.duration, withHours);

  return `${formattedPosition} / ${formattedDuration}`;
}
