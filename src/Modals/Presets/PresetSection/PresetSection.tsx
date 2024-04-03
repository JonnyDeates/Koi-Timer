import React from 'react';
import { round } from "../../../Utlis/TimerUtils";
import { useTimerContext } from '../../../Context/TimerContext';
import {DEFAULT_PRESET_IDS, Preset} from "../../../Context/reducers/IntervalPresetsReducer";



const sumArrayInHours = (numberArray: number[]) => {
    return numberArray.reduce((a, b) => a + b) / 60 ;
};
type PresetSectionType = Preset & { id: string }

const PresetSection = ({ timeInterval, title, description, id }: PresetSectionType) => {
    const { intervalPresets: {currentPresetId}, intervalPresetsDispatch } = useTimerContext();
    const isActive = currentPresetId === id;
    const isDefaultPreset = (DEFAULT_PRESET_IDS.includes(id));

    const handleSetTimer = () => {
        intervalPresetsDispatch({ type: "changePreset", id });
    };
    const handleDeletePreset = () => {
        intervalPresetsDispatch({type: "removePreset", id});
    };

    return (
        <div className={(isActive) ? 'tinted' : ''} onClick={handleSetTimer}>
            {!isDefaultPreset ? <button onClick={handleDeletePreset}>X</button> : ''}
            <h2>{title}</h2>
            <p>{description}</p>
            <p>Time Length: {round(sumArrayInHours(timeInterval), 2)} hours</p>
            <p>Times: <span>{timeInterval.map((num, i) => (i !== timeInterval.length - 1) ? (num + ', ') : num)}</span></p>
        </div>
    );
};


export default PresetSection;
