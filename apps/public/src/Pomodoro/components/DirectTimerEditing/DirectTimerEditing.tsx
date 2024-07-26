import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import './DirectTimerEditing.css'
import { useTimerContext } from "../../../contexts/TimerContext";

const handleInitialTimeSet = ( setter: Dispatch<SetStateAction<string>>, value: number) => {
    if(value !== 0) {
      if(value < 10) {
      setter("0"+String(value));
      } else {
      setter(String(value));
      }
    }
}

const handleLimitToSetter = (event: ChangeEvent<HTMLInputElement>, setter: Dispatch<SetStateAction<string>>, maximum = 60) => {
        const convertedEventNumber = Number(event.currentTarget.value);

        if(convertedEventNumber > maximum - 1){
            setter(String(maximum-1))
        } else if(convertedEventNumber > 9) {
            setter(String(convertedEventNumber))
        }
        else if(convertedEventNumber > 0) {
            setter(String('0'+convertedEventNumber))
        } else {
            setter('')
        }
  }
const DirectTimerEditing = () => {
    const {currentTimerSelected: {count, currentTimer}, currentTimerDispatch } = useTimerContext();

    const [hours, setHours] = useState<string>('');
    const [minutes, setMinutes] = useState<string>('');
    const [seconds, setSeconds] = useState<string>('');
    
  useEffect(()=> {
    handleInitialTimeSet(setSeconds, count % 60,);
    handleInitialTimeSet(setMinutes, Math.floor(count / 60) - (Math.floor(count / 3600) * 60));
    handleInitialTimeSet(setHours, Math.floor(count / 3600));
    }, [currentTimer]);


  useEffect(()=> {
    const secs = isNaN(Number(seconds)) ? 0 : Number(seconds);
    const mins = isNaN(Number(minutes)) ? 0 : Number(minutes);
    const hs = isNaN(Number(hours)) ? 0 : Number(hours);

  const newCount = (hs * 3600) + (mins * 60) + secs;
    if(!isNaN(newCount) && count !== newCount) {
    currentTimerDispatch({type: "setCount", newTime: newCount}) 
    }
  }, [hours, minutes, seconds]);

  //
    return <div className='DirectTimerEditing' >
        <input type={"number"}  placeholder='00' value={hours}
               onChange={(event) => handleLimitToSetter(event, setHours,100)}
              />
        <span>:</span>
        <input type={"number"} placeholder='00' value={minutes}
               onChange={(event) => handleLimitToSetter(event, setMinutes)}
        />
        <span>:</span>
        <input type={"number"} placeholder='00' value={seconds}
               onChange={(event) => handleLimitToSetter(event, setSeconds)}
               />
    </div>
}

export default DirectTimerEditing;
