import {useSoundEffectContext} from "../Context/SoundEffectContext";
import {useTimerContext} from "../Context/TimerContext";
import React, {ReactNode, RefObject } from "react";
import {getTime} from "../Utlis/TimerUtils";
import {TitleComponent} from "../Title/Title";
import DirectTimerEditing from "../DirectTimerEditing/DirectTimerEditing";

type TimerProps = {
    buttons: ReactNode,
    audioRef: null | RefObject<HTMLAudioElement>,
    timerBar?: ReactNode
}

const Timer = ({buttons, audioRef, timerBar}: TimerProps) => {
    const {audioToPlay: {sound}} = useSoundEffectContext();

    const {
        currentTimerSelected: {count, isEditingTimer},
        currentTimerDispatch
    } = useTimerContext();

    const handleDblClick = () => {
      currentTimerDispatch({type:"setIsEditingTimer", isEditingTimer: true})
    }
    const title = getTime(count);
    return (
        <div className="timer">
            {timerBar}
            <TitleComponent title={title + ' Koi Timer'}/>
            {isEditingTimer
                ? <DirectTimerEditing/>
                : <h1 onDoubleClick={handleDblClick}>{title}</h1>
            }
            <audio ref={audioRef}>
                <source src={sound}/>
            </audio>
            <div className="timer-buttons">
                {buttons}
            </div>
        </div>
    );
};
export default Timer;
