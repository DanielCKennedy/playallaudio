import { emptyProgress } from "../constants/playerConstants";
import { progressToFormattedTime } from "./timeUtils";

describe("progressToFormattedTime", () => {
  it("should return mins and seconds string if less than an hours long", () => {
    expect(progressToFormattedTime(emptyProgress)).toEqual("00:00 / 00:00");
  });

  it("should have hours segment if time is greater than an hour", () => {
    const progress = {
      position: 0,
      duration: 1000 * 60 * 60,
    };
    expect(progressToFormattedTime(progress)).toEqual("00:00:00 / 01:00:00");
  });

  it("should properly format minutes", () => {
    const progress = {
      position: 1000 * 60 * 5,
      duration: 1000 * 60 * 10,
    };
    expect(progressToFormattedTime(progress)).toEqual("05:00 / 10:00");
  });

  it("should properly format hours, mins, secs", () => {
    const progress = {
      position: (1000 * 60 * 60 * 2) + (1000 * 60 * 3) + (1000 * 35),
      duration: (1000 * 60 * 60 * 5) + (1000 * 60 * 27) + (1000 * 12),
    };
    expect(progressToFormattedTime(progress)).toEqual("02:03:35 / 05:27:12");
  });
});