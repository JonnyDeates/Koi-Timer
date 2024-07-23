import React, {ChangeEvent} from 'react';
import '../Modals.css'
import {useTimerContext} from "../../Context/TimerContext.js";
import {FloatingLabelInput, LabeledIconButton} from 'koi-pool';
import hoursHourGlass from "./assets/timer-icon-hours.png"
import minutesHourGlass from "./assets/timer-icon-minutes.png"
import secondsHourGlass from "./assets/timer-icon-seconds.png"
import {convertFromSecondsToOtherUnits, convertFromUnitOfTimeToSeconds} from "../../Utlis/Converters";
import TripleSelectActionButton from './TripleSelectButton/TripleSelectActionButton';

const CustomTimerModal = () => {
  const {
    instanceTimerDispatch,
    instanceTimer: {pomodoro, longBreak, shortBreak},
    unitOfTime,
    setUnitOfTime
  } = useTimerContext(); 

  const handlePomodoro = (e: ChangeEvent<HTMLInputElement>) => {
    const float = parseFloat(e.target.value);
    instanceTimerDispatch({type: "pomodoro", value: convertFromUnitOfTimeToSeconds(unitOfTime, float)});
  };
  const handleShortBreak = (e: ChangeEvent<HTMLInputElement>) => {
    const float = parseFloat(e.target.value);
    instanceTimerDispatch({type: "shortBreak", value: convertFromUnitOfTimeToSeconds(unitOfTime, float)});
  };
  const handleLongBreak = (e: ChangeEvent<HTMLInputElement>) => {
    const float = parseFloat(e.target.value);
    instanceTimerDispatch({type: "longBreak", value: convertFromUnitOfTimeToSeconds(unitOfTime, float)});
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




  return (<>

      <div className="customtimes-form">
        <h2>Unit of Time</h2>
        <p>The unit of time that the </p>
        <div className="radio">
          <LabeledIconButton src={secondsHourGlass} label={"Second"} isActive={unitOfTime === 'second'}
                             variant={'standard'}
                             onClick={handleSetSeconds} title={"Set unit of time to Seconds"}/>
          <LabeledIconButton src={minutesHourGlass} label={"Minute"} isActive={unitOfTime === 'minute'}
                             variant={'standard'}
                             onClick={handleSetMinutes} title={"Set unit of time to Minutes"}/>
          <LabeledIconButton src={hoursHourGlass} label={"Hour"} isActive={unitOfTime === 'hour'} variant={'standard'}
                             onClick={handleSetHours} title={"Set unit of time to Hours"}/>
        </div>
        <div className={"divider"}/>
        <TripleSelectActionButton/>
        <h2>Set Timers</h2>
        <div className='Input-wrapper'>
          <FloatingLabelInput label={"Pomodoro"} type="number" value={convertFromSecondsToOtherUnits(unitOfTime, pomodoro)}
                              onChange={handlePomodoro}/>
          <FloatingLabelInput label={"Short Break"} type="number" value={convertFromSecondsToOtherUnits(unitOfTime, shortBreak)}
                              onChange={handleShortBreak}/>
          <FloatingLabelInput label={"Long Break"} type="number" value={convertFromSecondsToOtherUnits(unitOfTime, longBreak)}
                              onChange={handleLongBreak}/>
        </div>
      </div>
      <div className={"divider"}/>


    </>
  );
};


export default CustomTimerModal;

