import React, { useEffect, useRef, useState } from 'react';
import { useTimerContext } from "../Context/TimerContext";
import "./Timer.css";
import { useSoundEffectContext } from "../Context/SoundEffectContext";
import { InstanceTimerType } from "../Context/reducers/InstanceTimerReducer";
import Timer from "./Timer";
import { Button } from 'koi-pool';

const InstanceTimer = () => {
    const { volume } = useSoundEffectContext();
    const {
        currentTimerSelected: { count, isActive, currentTimer },
        currentTimerDispatch,
        instanceTimer
    } = useTimerContext();
    const [intervalId, setIntervalId] = useState<number>();
    const ref = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!isActive && intervalId) {
            clearInterval(intervalId)
        }
    }, [isActive]);

    const handlePauseInterval = () => {
        clearInterval(intervalId);
        if (ref.current) {
            ref.current.pause();
        }
        currentTimerDispatch({ type: "setIsActive", isActive: false });
    };

    const handleStartInterval = () => {
        const interval = setInterval(() => {
            currentTimerDispatch({ type: "decreaseCount" });
            if (count <= 0 && ref.current) {
                ref.current.volume = volume;
                ref.current.pause();
                ref.current.load();
                ref.current.play();
            }
        }, 1000);
        setIntervalId(interval)
    };

    const handleToggleInterval = () => {
        if (isActive) {
            handlePauseInterval()
        } else {
            handleStartInterval();
        }
    }
    
    const handleRestartTimer = () => {
        clearInterval(intervalId);
        if (ref.current) {
            ref.current.pause();
        }
        let instanceKey = currentTimer as InstanceTimerType;
        let newTime = instanceTimer[instanceKey];
        currentTimerDispatch({ type: "setCount", newTime, isActive: false });
    };

    return (<Timer audioRef={ref} buttons={
        <>
            <Button onClick={handleToggleInterval} variant='accept' isActive={isActive}>{isActive ? "Pause" : "Start"}</Button>
            <Button onClick={handleRestartTimer} variant='cancel'>Restart</Button>
        </>
    } />
    );
};


export default InstanceTimer;
