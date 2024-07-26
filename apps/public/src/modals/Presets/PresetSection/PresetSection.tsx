import React, {useEffect} from 'react';
import { round } from "../../../utils/TimerUtils";
import { useTimerContext } from '../../../contexts/TimerContext';
import {DEFAULT_PRESET_IDS, Preset} from "../../../contexts/reducers/IntervalPresetsReducer";
import { CloseButton } from 'koi-pool';
import TimeBar from "../../../components/TimeBar/TimeBar";
import './PresetsSection.css'


const sumArrayInHours = (numberArray: number[]) => {
    return numberArray.reduce((a, b) => a + b) / 60 / 60 ;
};
type PresetSectionType = Preset & { id: string }

const PresetSection = ({ timeInterval, title, description, id }: PresetSectionType) => {
    const { intervalPresets: {currentPresetId}, intervalPresetsDispatch  } = useTimerContext();
    const isActive = currentPresetId === id;
    const isDefaultPreset = (DEFAULT_PRESET_IDS.includes(id));

    const handleSetTimer = () => {
        intervalPresetsDispatch({ type: "changePreset", id });
    };
    const handleDeletePreset = () => {
        intervalPresetsDispatch({type: "removePreset", id});
    };

    return (
        <div className={`PresetsSection ${(isActive) ? 'tinted' : ''}`} >
            {!isDefaultPreset ? <CloseButton onClick={handleDeletePreset}>X</CloseButton> : ''}
            <div onClick={handleSetTimer}>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>Time Length: {round(sumArrayInHours(timeInterval), 2)} hours</p>
                <TimeBar timeInterval={timeInterval.map((num, i) => num / 60)} intervalIndex={-1} handleClick={() => {
                }} showIntervalTime width={"90%"} height={"1.25rem"}/>
            </div>

        </div>
    );
};


export default PresetSection;
