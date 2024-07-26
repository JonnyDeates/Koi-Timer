import {round} from "./TimerUtils";
import {UnitOfTimeType} from "../contexts/TimerContext";

export const convertFromSecondsToOtherUnits = (unitOfTime: UnitOfTimeType, currentTime: number) => {
  switch (unitOfTime) {
    case "second":
      return currentTime;
    case "minute":
      return currentTime / 60;
    case "hour":
      return round(currentTime / 60 / 60, 2)
  }
};


export const convertFromUnitOfTimeToSeconds = (unitOfTime: UnitOfTimeType, currentTime: number) => {
  switch (unitOfTime) {
    case "second":
      return currentTime;
    case "minute":
      return currentTime * 60;
    case "hour":
      return currentTime * 60 * 60
  }
};