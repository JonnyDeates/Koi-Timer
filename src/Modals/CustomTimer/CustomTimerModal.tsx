import React, { ChangeEvent, useEffect, useState } from 'react';
import '../Modals.css'
import { useTimerContext } from "../../Context/TimerContext.js";
import { round } from '../../Utlis/TimerUtils';
import { Button } from 'koi-pool';
import TimeBar from '../../components/TimeBar/TimeBar';
import hoursHourGlass from "./timer-icon-hours.png"
import minutesHourGlass from "./timer-icon-minutes.png"
import secondsHourGlass from "./timer-icon-seconds.png"





const CustomTimerModal = () => {
    const {
        instanceTimerDispatch,
        instanceTimer: { pomodoro, longBreak, shortBreak },
        intervalPresetsDispatch,
        intervalPresets: { presets },
        unitOfTime,
        setUnitOfTime
    } = useTimerContext();
    const [customTimeInterval, setCustomTimeInterval] = useState<number[]>([25 * 60]);
    const [title, setTitle] = useState<string>(`Custom Preset ${Object.keys(presets).length - 2}`);
    const [description, setDescription] = useState<string>("");

    const convertFromSecondsToOtherUnits = (currentTime: number) => {
        switch (unitOfTime) {
            case 'second':
                return currentTime 
            case 'minute':
                return currentTime / 60
            case 'hour':
                return round(currentTime / 60 / 60, 2)
        }
    }


    const convertFromUnitOfTimeToSeconds = (currentTime: number) => {
        switch (unitOfTime) {
            case 'second':
                return currentTime 
            case 'minute':
                return currentTime * 60
            case 'hour':
                return currentTime * 60 * 60
        }
    }

    const handlePomodoro = (e: ChangeEvent<HTMLInputElement>) => {
        const float = parseFloat(e.target.value);
        instanceTimerDispatch({ type: "pomodoro", value: convertFromUnitOfTimeToSeconds(float) });
    };
    const handleShortBreak = (e: ChangeEvent<HTMLInputElement>) => {
        const float = parseFloat(e.target.value);
        instanceTimerDispatch({ type: "shortBreak", value: convertFromUnitOfTimeToSeconds(float) });
    };
    const handleLongBreak = (e: ChangeEvent<HTMLInputElement>) => {
        const float = parseFloat(e.target.value);
        instanceTimerDispatch({ type: "longBreak", value: convertFromUnitOfTimeToSeconds(float) });
    };
    const handleSetSeconds = () => {
        setUnitOfTime('second')
    };
    const handleSetMinutes = () => {
        setUnitOfTime('minute')
    };
    const handleSetHours = () => {
        setUnitOfTime('hour')
    };

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
                    title,
                    description,
                    timeInterval: customTimeInterval,
                },
            })
        } else {
            alert('The time sequence is not large enough.')
        }
    };

    const totalTime = round(customTimeInterval.reduce((a, b) =>  a + b, 0), 2);



    return (<>

        <div className="customtimes-form">
            <h2>Set Timers</h2>
            <div className="radio">
                <button className={`LabeledIconButton ${unitOfTime === 'second' ? "active" : ""}`} onClick={handleSetSeconds}>
                    <img src={secondsHourGlass} />
                    Second
                </button>
                <button className={`LabeledIconButton ${unitOfTime === 'minute' ? "active" : ""}`} onClick={handleSetMinutes}>
                    <img src={minutesHourGlass} />
                    Minute
                </button>          <button className={`LabeledIconButton ${unitOfTime === 'hour' ? "active" : ""}`} onClick={handleSetHours}>
                    <img src={hoursHourGlass} />
                    Hour
                </button>
            </div>
            <div className='Input-wrapper'>
                <div className='Input'>
                    <label >
                        Pomodoro
                    </label>
                    <input type="number" value={convertFromSecondsToOtherUnits(pomodoro)} onChange={handlePomodoro} />

                </div>
                <div className='Input'>
                    <label >
                        Short Break
                    </label>
                    <input type="number" value={convertFromSecondsToOtherUnits(shortBreak)} onChange={handleShortBreak} />
                </div>
                <div className='Input'>
                    <label >
                        Long Break
                    </label>
                    <input type="number" value={convertFromSecondsToOtherUnits(longBreak)} onChange={handleLongBreak} />
                </div>
            </div>
        </div>
        <div className={'custom-preset'}>
            <h2>Create Custom Preset</h2>
            <div>
                <label>Title: 
                    <input value={title}/>
                </label>
            </div>            
            <div>
                <label>Description: 
                    <input value={description}/>
                </label>
            </div>
            <div>
                <Button onClick={() => handleAddTimeIntervalToCurrent(pomodoro)}>
                    Pomodoro
                </Button>
                <Button onClick={() => handleAddTimeIntervalToCurrent(shortBreak)}>
                    Short Break
                </Button>
                <Button onClick={() => handleAddTimeIntervalToCurrent(longBreak)}>
                    Long Break
                </Button>
            </div>
            <div>
                <TimeBar timeInterval={customTimeInterval.map((x)=> convertFromSecondsToOtherUnits(x))} intervalIndex={-1} handleClick={() => { }} showIntervalTime height='1.5em' />
                <p>
                    Total Time:
                    <span>{convertFromSecondsToOtherUnits(totalTime)} {unitOfTime}s</span>
                </p>

            </div>
            <div>
                <Button variants='cancel' onClick={handleClearCurrentTimeInterval}>Clear</Button>
                <Button variants={customTimeInterval.length < 2 ? 'disabled' : 'standard'} onClick={handleAddPreset}>Submit</Button>
            </div>
        </div>
    </>
    ); 
};


export default CustomTimerModal;

