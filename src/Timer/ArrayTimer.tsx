import React, {useEffect, useRef, useState} from 'react';
import "./Timer.css";
import {useTimerContext} from "../Context/TimerContext";
import {useSoundEffectContext} from "../Context/SoundEffectContext";
import Timer from "./Timer";
import {Button} from "koi-pool";

const ArrayTimer = () => {
    const {
      intervalPresets: {presets, currentPresetId, intervalIndex},
      currentTimerSelected: {isActive, count},
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
    }, [isActive]);

    useEffect(() => {
      let newTime = currentTimeInterval[intervalIndex] * 60;
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

        if (currentTimeInterval.length !== intervalIndex && count <= 0) {
          if (ref.current) {
            ref.current.volume = volume;
            ref.current.pause();
            ref.current.load();
            ref.current.play();
          }
          intervalPresetsDispatch({type: "incrementIntervalIndex"});
        } else if (count <= 0) {
          if (ref.current) {
            ref.current.volume = volume;
            ref.current.pause();
            ref.current.load();
            ref.current.play();
          }
          // intervalPresetsDispatch({type:"incrementIntervalIndex"});
          clearInterval(intervalId);
        }
      }, 1000);

      setIntervalId(currentIntervalId)
    };

    const handleRestartTimer = () => {
      clearInterval(intervalId);
      if (ref.current) {
        ref.current.pause();
      }
      let newTime = currentTimeInterval[intervalIndex] * 60;
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

    const sumOfInterval = currentTimeInterval.reduce((a, b) => a + b, 0);
    return <Timer audioRef={ref}
                  timerBar={
                    <div className={'timer-elapsed'}>
                      {currentTimeInterval.map((x, i) =>
                        <div key={i}
                             className={((i) < intervalIndex) ? 'grey' : (i === intervalIndex) ? 'active' : ''}
                             style={{
                               width: (x / sumOfInterval) * 100 + '%',
                               animationDelay: (1 + i / (4 + i)) + 's'
                             }}
                             onClick={() => handleSetToIndexInterval(i)}
                        />
                      )}
                    </div>
                  }
                  buttons={
                    <>
                      {isActive 
                        ? <Button onClick={handlePauseInterval}> Pause </Button> 
                        : <Button onClick={handleStartInterval}> Start </Button>}
                      <Button onClick={handleBackInterval}>Back</Button>
                      <Button onClick={handleSkipInterval}>Skip</Button>
                      <Button onClick={handleRestartTimer}> Restart</Button>
                    </>
                  }/>
  }
;


export default ArrayTimer;
