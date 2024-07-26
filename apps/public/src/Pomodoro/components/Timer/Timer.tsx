import {useSoundEffectContext} from "../../../contexts/SoundEffectContext";
import {useTimerContext} from "../../../contexts/TimerContext";
import React, {ReactNode, RefObject } from "react";
import {getTime} from "../../../utils/TimerUtils";
import {TitleComponent} from "../../../components/Title/Title";
import DirectTimerEditing from "../DirectTimerEditing/DirectTimerEditing";
import './Timer.css'

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
        <div className="Timer">
            {timerBar}
            <TitleComponent title={title + ' Koi Timer'}/>
            {isEditingTimer
                ? <DirectTimerEditing/>
                : <h1 onClick={handleDblClick}>{title}</h1>
            }
            <audio ref={audioRef}>
                <source src={sound}/>
            </audio>
            <div className="TimerButtons">
                {buttons}
            </div>
        </div>
    );
};
export default Timer;
