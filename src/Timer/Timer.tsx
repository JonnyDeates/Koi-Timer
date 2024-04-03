import {useSoundEffectContext} from "../Context/SoundEffectContext";
import {useTimerContext} from "../Context/TimerContext";
import React, {ReactNode, RefObject} from "react";
import {getTime} from "../Utlis/TimerUtils";
import {TitleComponent} from "../Title/Title";

type TimerProps = {
    buttons: ReactNode,
    audioRef: null | RefObject<HTMLAudioElement>,
    timerBar?: ReactNode
}

const Timer = ({buttons, audioRef, timerBar}: TimerProps) => {
    const {audioToPlay: {sound}} = useSoundEffectContext();
    const {
        currentTimerSelected: {count},
    } = useTimerContext();

    const title = getTime(count);
    return (
        <div className="timer">
            {timerBar}
            <TitleComponent title={title + ' Koi Timer'}/>
            <h1>{title}</h1>
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