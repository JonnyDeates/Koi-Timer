import React, {ChangeEvent} from 'react';
import '../Modals.css'
import {useTimerContext} from "../../Context/TimerContext.js";
import {FloatingLabelInput} from 'koi-pool';
import {convertFromSecondsToOtherUnits, convertFromUnitOfTimeToSeconds} from "../../Utlis/Converters";
import {SelectUnitOfTime} from "../components/SelectUnitOfTime/SelectUnitOfTime";

const CustomTimerModal = () => {
  const {
    instanceTimerDispatch,
    instanceTimer: {pomodoro, longBreak, shortBreak},
    unitOfTime,
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



  return (<>

        <div className="customtimes-form">
          <SelectUnitOfTime/>
          <div className={"divider"}/>
          <h2>Set Timers</h2>
          <div className='Input-wrapper'>
            <FloatingLabelInput label={"Pomodoro"} type="number"
                                value={convertFromSecondsToOtherUnits(unitOfTime, pomodoro)}
                                onChange={handlePomodoro}/>
            <FloatingLabelInput label={"Short Break"} type="number"
                                value={convertFromSecondsToOtherUnits(unitOfTime, shortBreak)}
                                onChange={handleShortBreak}/>
            <FloatingLabelInput label={"Long Break"} type="number"
                                value={convertFromSecondsToOtherUnits(unitOfTime, longBreak)}
                                onChange={handleLongBreak}/>
          </div>
        </div>
        <div className={"divider"}/>


      </>
  );
};


export default CustomTimerModal;

