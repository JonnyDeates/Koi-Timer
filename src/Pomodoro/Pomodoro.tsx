import React from 'react';
import InstanceTimer from "../Timer/InstanceTimer";
import ArrayTimer from "../Timer/ArrayTimer";
import './Pomodoro.css'
import {useTimerContext} from "../Context/TimerContext";
import {CurrentSelectedTimerType} from "../Context/reducers/ActiveTimerReducer";

const Pomodoro = () => {
    const {
        currentTimerSelected: { currentTimer},
        currentTimerDispatch,
        instanceTimer,
        intervalPresets: {currentPresetId, presets, intervalIndex},
    } = useTimerContext();

    const handleSetCount = (currentSelectedKey: CurrentSelectedTimerType) => {
        let newTime: number;
        if (currentSelectedKey === 'interval') {
            newTime = presets[currentPresetId].timeInterval[intervalIndex] * 60; // Convert to minutes
        } else {
            newTime = instanceTimer[currentSelectedKey] * 60; // Convert to minutes
        }
        currentTimerDispatch({type: 'setActiveTimer', newTime, currentTimer: currentSelectedKey});

    };

    const controlButtons: { text: string, currentSelectedKey: CurrentSelectedTimerType }[] = [
        {text: "Pomodoro", currentSelectedKey: 'pomodoro'},
        {text: "Short Break", currentSelectedKey: 'shortBreak'},
        {text: "Long Break", currentSelectedKey: 'longBreak'},
        {text: "Loop", currentSelectedKey: 'interval'},
    ];

    const isIntervalSelected = currentTimer === 'interval'

    return (
        <div className="body">
            {controlButtons.map(({text, currentSelectedKey}, i) =>
                <button key={currentSelectedKey + i} className={currentTimer === currentSelectedKey ? 'tinted' : ''}
                        onClick={() => handleSetCount(currentSelectedKey)}>
                    {text}
                </button>
            )}
            {isIntervalSelected
                ? <ArrayTimer/>
                : <InstanceTimer/>}
        </div>
    );
};


export default Pomodoro;
