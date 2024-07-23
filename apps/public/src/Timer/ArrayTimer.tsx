import React, {useEffect, useRef, useState} from 'react';
import "./Timer.css";
import {useTimerContext} from "../Context/TimerContext";
import {useSoundEffectContext} from "../Context/SoundEffectContext";
import Timer from "./Timer";
import {Button} from "koi-pool";
import TimeBar from '../TimeBar/TimeBar';


const ArrayTimer = () => {
  const {
    intervalPresets: {presets, currentPresetId, intervalIndex},
    currentTimerSelected: {isActive, count},
    isEditingTimer,
    currentTimerDispatch,
    intervalPresetsDispatch
  } = useTimerContext();
  const {volume} = useSoundEffectContext();
  const [intervalId, setIntervalId] = useState<number>();
  const ref = useRef<HTMLAudioElement>(null);
  const currentTimeInterval = presets[currentPresetId].timeInterval;

  useEffect(() => {
    if (!isActive && intervalId) {
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId)
  }, [isActive]);

  useEffect(() => {
    if (count <= 0 && !isEditingTimer) {
      if (currentTimeInterval.length - 1 !== intervalIndex) {
        if (ref.current) {
          ref.current.volume = volume;
          ref.current.pause();
          ref.current.load();
          ref.current.play();
        }
        intervalPresetsDispatch({type: "incrementIntervalIndex"});
      } else {
        if (ref.current) {
          ref.current.volume = volume;
          ref.current.pause();
          ref.current.load();
          ref.current.play();
        }
        clearInterval(intervalId);
      }
    }
  }, [count, isEditingTimer]);

  useEffect(() => {
    let newTime = currentTimeInterval[intervalIndex];
    currentTimerDispatch({type: "setCount", newTime});
  }, [intervalIndex, currentPresetId]);

  const handlePauseInterval = () => {
    clearInterval(intervalId);
    if (ref.current) {
      ref.current.pause();
    }
    currentTimerDispatch({type: "setIsActive", isActive: false});
  };

  const handleStartInterval = () => {
    const currentIntervalId = setInterval(() => {
      currentTimerDispatch({type: "decreaseCount"});
    }, 1000);

    setIntervalId(currentIntervalId)
  };


  const handleToggleInterval = () => {
    if (isActive) {
      handlePauseInterval();
    } else {
      handleStartInterval();
    }
  };

  const handleRestartTimer = () => {
    clearInterval(intervalId);
    if (ref.current) {
      ref.current.pause();
    }
    let newTime = currentTimeInterval[intervalIndex];
    currentTimerDispatch({type: "setCount", newTime, isActive: false});
  };

  const handleSkipInterval = () => {
    clearInterval(intervalId); // Maybe?
    intervalPresetsDispatch({type: "incrementIntervalIndex"});
  };

  const handleBackInterval = () => {
    clearInterval(intervalId); // Maybe?
    intervalPresetsDispatch({type: "decrementIntervalIndex"});
  };

  const handleSetToIndexInterval = (index: number) => {
    clearInterval(intervalId); // Maybe?
    intervalPresetsDispatch({type: "setIntervalIndex", index});
  };

  return <Timer audioRef={ref}
                timerBar={
                  <TimeBar handleClick={handleSetToIndexInterval} intervalIndex={intervalIndex}
                           timeInterval={currentTimeInterval}/>
                }
                buttons={
                  <>
                    <Button onClick={handleToggleInterval} isActive={isActive}
                            variant={"accept"}> {isActive ? "Pause" : "Start"} </Button>
                    <Button onClick={handleBackInterval} variant={"cancel"}>Back</Button>
                    <Button onClick={handleSkipInterval} variant={"cancel"}>Skip</Button>
                    <Button onClick={handleRestartTimer} variant={"cancel"}> Restart</Button>
                  </>
                }/>
};


export default ArrayTimer;
