import React from 'react';
import { round } from "../../Utlis/TimerUtils";
import { DEFAULT_PRESET_IDS, Preset, useTimerContext } from 'Context/TimerContext';



const sumArrayInHours = (numberArray: number[]) => {
    return numberArray.reduce((a, b) => a + b) / 60 ;
}
type PresetSectionType = Preset & { isActive: boolean }

const PresetSection = ({ isActive, timeInterval, title, description, id }: PresetSectionType) => {
    const { presetsDispatch } = useTimerContext()

    const handleSetTimer = () => {
        presetsDispatch({ type: "changePreset", id });
    }
    const handleDeletePreset = () => {
        presetsDispatch({type: "removePreset", id});
    }

    const isDefaultPreset = (DEFAULT_PRESET_IDS.includes(id))

    return (
        <div className={(isActive) ? 'tinted' : ''} onClick={handleSetTimer}>
            {!isDefaultPreset ? <button onClick={handleDeletePreset}>X</button> : ''}
            <h2>{title}</h2>
            <p>{description}</p>
            <p>Time Length: {round(sumArrayInHours(timeInterval), 2)} hours</p>
            <p>Times: <span>{timeInterval.map((num, i) => (i !== timeInterval.length - 1) ? (num + ', ') : num)}</span></p>
        </div>
    );

}


export default PresetSection;
