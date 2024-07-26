import {useTimerContext} from "../../../contexts/TimerContext";
import {LabeledIconButton} from "koi-pool";
import secondsHourGlass from "./assets/timer-icon-seconds.png";
import minutesHourGlass from "./assets/timer-icon-minutes.png";
import hoursHourGlass from "./assets/timer-icon-hours.png";
import React from "react";
import './SelectUnitOfTime.css'

type SelectUnitOfTimeProps = {
    size?: 'small' | 'normal'
}

export const SelectUnitOfTime = ({size = 'normal'}: SelectUnitOfTimeProps) => {

    const {
        unitOfTime,
        setUnitOfTime
    } = useTimerContext();

    const unitOfTimeButtonClassName = size === 'small' ? 'SmallUnitOfTimeButton' : ''

    const handleSetSeconds = () => {
        setUnitOfTime('second')
    };
    const handleSetMinutes = () => {
        setUnitOfTime('minute')
    };
    const handleSetHours = () => {
        setUnitOfTime('hour')
    };

    return <div className="SelectUnitOfTime">
        <LabeledIconButton src={secondsHourGlass} label={"Second"} isActive={unitOfTime === 'second'}
                           variant={'standard'} className={unitOfTimeButtonClassName}
                           onClick={handleSetSeconds} title={"Set unit of time to Seconds"}/>
        <LabeledIconButton src={minutesHourGlass} label={"Minute"} isActive={unitOfTime === 'minute'}
                           variant={'standard'} className={unitOfTimeButtonClassName}
                           onClick={handleSetMinutes} title={"Set unit of time to Minutes"}/>
        <LabeledIconButton src={hoursHourGlass} label={"Hour"} isActive={unitOfTime === 'hour'} variant={'standard'}
                           onClick={handleSetHours} title={"Set unit of time to Hours"}
                           className={unitOfTimeButtonClassName}/>
    </div>;
}