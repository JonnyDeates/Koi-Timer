import React, {ChangeEvent, useState} from 'react';
import '../Modals.css'
import {useTimerContext} from "../../Context/TimerContext.js";
import {round} from "../../Utlis/TimerUtils.js";
import GenericModal, {LimitedModalProps} from "../GenericModal/GenericModal.js";

const CustomTimerModal = ({isOpen, handleClose}: LimitedModalProps) => {
    const {
        intervalPresets: {presets},
        intervalPresetsDispatch,
        instanceTimerDispatch,
        instanceTimer: {pomodoro, longBreak, shortBreak}
    } = useTimerContext();
    const [isInMinutes, setIsInMinutes] = useState<boolean>(true);
    const [customTimeInterval, setCustomTimeInterval] = useState<number[]>([25]);

    const handlePomodoro = (e: ChangeEvent<HTMLInputElement>) => {
        const float = parseFloat(e.target.value);
        instanceTimerDispatch({type: "pomodoro", value: float});
    };
    const handleShortBreak = (e: ChangeEvent<HTMLInputElement>) => {
        const float = parseFloat(e.target.value);
        instanceTimerDispatch({type: "shortBreak", value: float});
    };
    const handleLongBreak = (e: ChangeEvent<HTMLInputElement>) => {
        const float = parseFloat(e.target.value);
        instanceTimerDispatch({type: "longBreak", value: float});
    };
    const handleToggleTime = () => {
        setIsInMinutes(!isInMinutes)
    };

    // convertTime(num)
    // {
    //     if (this.state.timeScaleMinutes) {
    //         return parseFloat(Math.round(num * 60).toFixed(1));
    //     } else {
    //         return parseInt(num);
    //     }
    // }

    // minuteCheck(timeSelected)
    // {
    //     if (this.state.timeScaleMinutes) {
    //         return timeSelected;
    //     } else {
    //         return timeSelected / 60;
    //     }
    // }

    const handleAddTimeIntervalToCurrent = (interval: number) => {
        setCustomTimeInterval((prevState) => [...prevState, interval])
    };

    const handleClearCurrentTimeInterval = () => {
        setCustomTimeInterval([])
    };

    const handleAddPreset = () => {
        if (customTimeInterval.length >= 2) {
            intervalPresetsDispatch({
                type: "addPreset", preset: {
                    title: `Custom Preset ${Object.keys(presets).length - 2}`,
                    description: 'This is a client added preset.',
                    timeInterval: customTimeInterval,
                },
            })
        } else {
            alert('The time sequence is not large enough.')
        }
    };

    return (
        <GenericModal handleClose={handleClose} isOpen={isOpen} title={"Custom Timers"}>
            <div className="customtimes-form">
                <h2>Set Timers</h2>
                <div className="radio">
                    <label>
                        <input type="radio" value="minutes" onChange={handleToggleTime} checked={isInMinutes}/>
                        Minutes
                    </label>
                    <label>
                        <input type="radio" value="seconds" onChange={handleToggleTime} checked={!isInMinutes}/>
                        Seconds
                    </label>
                </div>
                <label>
                    Pomodoro:
                    <input type="number" value={pomodoro} onChange={handlePomodoro}/>
                </label>
                <label>
                    Short Break:
                    <input type="number" value={shortBreak} onChange={handleShortBreak}/>
                </label>
                <label>
                    Long Break:
                    <input type="number" value={longBreak} onChange={handleLongBreak}/>
                </label>
            </div>
            <div className={'custom-preset'}>
                <h2> Custom Preset</h2>
                <div>
                    <button onClick={() => handleAddTimeIntervalToCurrent(pomodoro)}>
                        Pomodoro
                    </button>
                    <button onClick={() => handleAddTimeIntervalToCurrent(shortBreak)}>
                        Short Break
                    </button>
                    <button onClick={() => handleAddTimeIntervalToCurrent(longBreak)}>
                        Long Break
                    </button>
                </div>
                <div>
                    <p>Length: <span>{round(customTimeInterval.reduce((a, b) => {
                        return a + b;
                    }, 0) / 60, 2)} hours</span></p>
                    <p>Times: <span>{(customTimeInterval.length !== 0) ? customTimeInterval.map((num, i) => (i !== customTimeInterval.length - 1) ? (round(num, 2) + ', ') : round(num, 2)) : 'N/A'}</span>
                    </p>
                </div>
                <div>
                    <button onClick={handleClearCurrentTimeInterval}>Clear</button>
                    <button onClick={handleAddPreset}>Submit</button>
                </div>
            </div>
        </GenericModal>
    );
};


export default CustomTimerModal;

