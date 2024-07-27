import React, {useEffect, useRef, useState} from 'react';
import {useTimerContext} from "../../../contexts/TimerContext";
import {useSoundEffectContext} from "../../../contexts/SoundEffectContext";
import {InstanceTimerType} from "../../../contexts/reducers/InstanceTimerReducer";
import Timer from "../Timer/Timer";
import {Button} from 'koi-pool';

const InstanceTimer = () => {
    const {volume} = useSoundEffectContext();
    const {
        currentTimerSelected: {count, isActive, currentTimer, isEditingTimer},
        currentTimerDispatch,
        instanceTimer
    } = useTimerContext();
    const [intervalId, setIntervalId] = useState<number>();
    const ref = useRef<HTMLAudioElement>(null);

    const resetInterval = () => {
        clearInterval(intervalId);
        setIntervalId(undefined);
    }

    useEffect(() => {
        if (!isActive && intervalId) {
            resetInterval()
        }
        return () => resetInterval()
    }, [isActive]);

    useEffect(() => {
        if (count <= 0 && !isEditingTimer) {
            if (ref.current) {
                ref.current.volume = volume;
                ref.current.pause();
                ref.current.load();
                ref.current.play();
            }
            currentTimerDispatch({type: "setIsActive", isActive: false})
            resetInterval();
        }
    }, [count, isEditingTimer]);

    const handlePauseInterval = () => {
        resetInterval();
        if (ref.current) {
            ref.current.pause();
        }
        currentTimerDispatch({type: "setIsActive", isActive: false});
    };

    const handleStartInterval = () => {
        if (count === 0) {
            handleSetTimer(true)
        }
        if (intervalId === undefined) {
            const interval = setInterval(() => {
                currentTimerDispatch({type: "decreaseCount"});
            }, 1000);
            setIntervalId(interval)

        }
    };

    const handleToggleInterval = () => {
        if (isActive) {
            handlePauseInterval()
        } else {
            handleStartInterval();
        }
    }


    const handleSetTimer = (startTimer: boolean) => {
        let instanceKey = currentTimer as InstanceTimerType;
        let newTime = instanceTimer[instanceKey];
        currentTimerDispatch({type: "setCount", newTime, isActive: startTimer});
    };

    const handleRestartTimer = () => {
        resetInterval();
        if (ref.current) {
            ref.current.pause();
        }
        handleSetTimer(false);
    };

    return (<Timer audioRef={ref} buttons={
            <>
                <Button onClick={handleToggleInterval} variant='accept'
                        isActive={isActive}>{isActive ? "Pause" : "Start"}</Button>
                <Button onClick={handleRestartTimer} variant='cancel'>Restart</Button>
            </>
        }/>
    );
};


export default InstanceTimer;
