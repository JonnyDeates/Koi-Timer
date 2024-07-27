import React, {ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useRef, useState} from "react";
import './DirectTimerEditing.css'
import {useTimerContext} from "../../../contexts/TimerContext";

const handleInitialTimeSet = (setter: Dispatch<SetStateAction<string>>, value: number) => {
    if (value !== 0) {
        if (value < 10) {
            setter("0" + String(value));
        } else {
            setter(String(value));
        }
    }
}

const handleLimitToSetter = (event: ChangeEvent<HTMLInputElement>, setter: Dispatch<SetStateAction<string>>, maximum = 60) => {
    const convertedEventNumber = Number(event.currentTarget.value);

    if (convertedEventNumber > maximum - 1) {
        setter(String(maximum - 1))
    } else if (convertedEventNumber > 9) {
        setter(String(convertedEventNumber))
    } else if (convertedEventNumber > 0) {
        setter(String('0' + convertedEventNumber))
    } else {
        setter('')
    }
}
const DirectTimerEditing = () => {
    const {currentTimerSelected: {count, currentTimer}, currentTimerDispatch} = useTimerContext();
    const divRef = useRef<HTMLDivElement>(null);
    const [hours, setHours] = useState<string>('');
    const [minutes, setMinutes] = useState<string>('');
    const [seconds, setSeconds] = useState<string>('');

    useEffect(() => {
        handleInitialTimeSet(setSeconds, count % 60,);
        handleInitialTimeSet(setMinutes, Math.floor(count / 60) - (Math.floor(count / 3600) * 60));
        handleInitialTimeSet(setHours, Math.floor(count / 3600));
    }, [currentTimer]);

    useEffect(() => {
        const handleClickOutside = (event: globalThis.MouseEvent) => {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                currentTimerDispatch({type: "setIsEditingTimer", isEditingTimer: false})
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside );
        };
    }, [divRef]);


    useEffect(() => {
        const secs = isNaN(Number(seconds)) ? 0 : Number(seconds);
        const mins = isNaN(Number(minutes)) ? 0 : Number(minutes);
        const hs = isNaN(Number(hours)) ? 0 : Number(hours);

        const newCount = (hs * 3600) + (mins * 60) + secs;
        if (!isNaN(newCount) && count !== newCount) {
            if(newCount === 0){
                currentTimerDispatch({type: "setCount", newTime: 1})
            } else {
                currentTimerDispatch({type: "setCount", newTime: newCount})
            }
        }
    }, [hours, minutes, seconds]);

    return <div className='DirectTimerEditing' ref={divRef}>
        <input type={"number"} placeholder='00' value={hours} name={'hours'}
               onChange={(event) => handleLimitToSetter(event, setHours, 100)}
        />
        <span>:</span>
        <input type={"number"} placeholder='00' value={minutes} name={'minutes'}
               onChange={(event) => handleLimitToSetter(event, setMinutes)}
        />
        <span>:</span>
        <input type={"number"} placeholder='00' value={seconds} name={'seconds'}
               onChange={(event) => handleLimitToSetter(event, setSeconds)}
        />
    </div>
}

export default DirectTimerEditing;
